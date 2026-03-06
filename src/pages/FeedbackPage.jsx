import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Typography, Paper, Rating, Stack, Divider,
  Avatar, Chip, Alert, Card, CardContent,
  CircularProgress,
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import StarIcon    from '@mui/icons-material/Star';
import InfoIcon    from '@mui/icons-material/Info';

import { fetchFeedback } from '../store/feedbackSlice';

/* ─────────────────────────────── ReviewCard (read-only) ── */
function ReviewCard({ review }) {
  const initials = review.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card variant="outlined" sx={{ borderRadius: 2 }}>
      <CardContent>
        <Stack direction="row" spacing={1.5} alignItems="flex-start">
          <Avatar sx={{ bgcolor: '#1a1a2e', width: 40, height: 40, fontSize: 14, fontWeight: 700 }}>
            {initials}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
              <Typography variant="subtitle2" fontWeight={700}>{review.name}</Typography>
              <Chip label={review.date} size="small" variant="outlined" sx={{ fontSize: 11 }} />
            </Stack>
            <Rating value={review.rating} readOnly size="small" sx={{ my: 0.5 }} />
            <Typography variant="body2" color="text.secondary">{review.text}</Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

/* ─────────────────────────────── FeedbackPage (только чтение) ── */
/**
 * FeedbackPage — страница отзывов для обычных пользователей (read-only).
 *
 * Данные загружаются через GET /feedback (Redux async thunk).
 * Форма отправки и кнопки удаления перенесены в /admin/feedback (блок администрирования).
 */
function FeedbackPage() {
  const dispatch = useDispatch();
  const { items: reviews, loading, error } = useSelector((s) => s.feedback);

  useEffect(() => {
    dispatch(fetchFeedback());
  }, [dispatch]);

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 800 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Обратная связь
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Отзывы пользователей. Данные загружаются через{' '}
        <code>GET /feedback</code> (Redux async thunk + axios).
      </Typography>

      {/* ── Подсказка об admin-панели ── */}
      <Alert
        severity="info"
        icon={<InfoIcon />}
        sx={{ mb: 3, borderRadius: 2 }}
      >
        Управление отзывами (добавление, удаление) доступно администратору
        в разделе <strong>Администрирование → Отзывы</strong>.
      </Alert>

      {/* ── Статистика ── */}
      <Paper
        variant="outlined"
        sx={{
          p: 2.5, mb: 3, borderRadius: 3,
          display: 'flex', gap: 3, alignItems: 'center', flexWrap: 'wrap',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <StarIcon sx={{ color: '#ffa726' }} />
          <Typography variant="h5" fontWeight={700}>{avgRating}</Typography>
          <Typography color="text.secondary">средняя оценка</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CommentIcon sx={{ color: '#42a5f5' }} />
          <Typography variant="h5" fontWeight={700}>{reviews.length}</Typography>
          <Typography color="text.secondary">
            {reviews.length === 1 ? 'отзыв' : reviews.length < 5 ? 'отзыва' : 'отзывов'}
          </Typography>
        </Box>
        {loading && <CircularProgress size={24} />}
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Ошибка сервера: {error}. Убедитесь что json-server запущен (<code>npm run server</code>).
        </Alert>
      )}

      {/* ── Список отзывов ── */}
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
        <CommentIcon sx={{ color: '#61dafb' }} />
        <Typography variant="h6" fontWeight={700}>
          Отзывы ({reviews.length})
        </Typography>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      {loading && reviews.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Stack spacing={2}>
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
          {!loading && reviews.length === 0 && (
            <Typography color="text.secondary" textAlign="center" sx={{ mt: 2 }}>
              Отзывов пока нет
            </Typography>
          )}
        </Stack>
      )}
    </Box>
  );
}

export default FeedbackPage;
