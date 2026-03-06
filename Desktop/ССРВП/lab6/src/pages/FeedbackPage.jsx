import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  Box, Typography, Paper, TextField,
  Button as MuiButton, Rating, Stack, Divider,
  Avatar, Chip, Alert, Card, CardContent,
  IconButton, Tooltip, CircularProgress,
} from '@mui/material';
import SendIcon    from '@mui/icons-material/Send';
import CommentIcon from '@mui/icons-material/Comment';
import StarIcon    from '@mui/icons-material/Star';
import DeleteIcon  from '@mui/icons-material/Delete';

import { fetchFeedback, addFeedback, removeFeedback } from '../store/feedbackSlice';
import { useCurrentUser } from '../hooks/useLoginState';

/* ─────────────────────────────── ReviewCard ── */
function ReviewCard({ review, onDelete }) {
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
              <Stack direction="row" spacing={1} alignItems="center">
                <Chip label={review.date} size="small" variant="outlined" sx={{ fontSize: 11 }} />
                <Tooltip title="Удалить отзыв (DELETE /feedback/:id)">
                  <IconButton size="small" color="error" onClick={() => onDelete(review.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
            <Rating value={review.rating} readOnly size="small" sx={{ my: 0.5 }} />
            <Typography variant="body2" color="text.secondary">{review.text}</Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

/* ─────────────────────────────── FeedbackPage ── */
function FeedbackPage() {
  const dispatch    = useDispatch();
  const currentUser = useCurrentUser();

  const { items: reviews, loading, error } = useSelector((s) => s.feedback);

  const [rating,  setRating]  = useState(5);
  const [success, setSuccess] = useState('');

  /** GET /feedback — загружаем отзывы с сервера при монтировании */
  useEffect(() => {
    dispatch(fetchFeedback());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name: currentUser?.name ?? '', text: '' },
  });

  /** POST /feedback — отправить новый отзыв через Redux async thunk */
  const onSubmit = useCallback(async (data) => {
    setSuccess('');
    const newReview = {
      name:   data.name,
      rating: rating,
      text:   data.text,
      date:   new Date().toLocaleDateString('ru-RU'),
    };
    const result = await dispatch(addFeedback(newReview));
    if (addFeedback.fulfilled.match(result)) {
      setSuccess('Спасибо! Ваш отзыв успешно добавлен.');
      reset({ name: currentUser?.name ?? '', text: '' });
      setRating(5);
    }
  }, [dispatch, rating, reset, currentUser]);

  /** DELETE /feedback/:id — удалить отзыв через Redux async thunk */
  const handleDelete = useCallback((id) => {
    dispatch(removeFeedback(id));
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
        GET/POST/DELETE запросы через <code>axios</code> + <code>Redux Toolkit</code> (async thunks).
        Данные хранятся на REST-сервере (<code>json-server :3001</code>).
      </Typography>

      {/* ── Статистика ── */}
      <Paper
        variant="outlined"
        sx={{
          p: 2.5, mb: 3, borderRadius: 3, display: 'flex',
          gap: 3, alignItems: 'center', flexWrap: 'wrap',
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

      {/* ── Форма отзыва ── */}
      <Paper variant="outlined" sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SendIcon sx={{ color: '#61dafb' }} />
          Оставить отзыв — POST /feedback
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Ваше имя"
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register('name', {
              required: 'Укажите имя',
              minLength: { value: 2, message: 'Минимум 2 символа' },
              maxLength: { value: 50, message: 'Максимум 50 символов' },
            })}
          />

          <Box sx={{ mt: 1.5, mb: 0.5 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Оценка
            </Typography>
            <Rating
              value={rating}
              onChange={(_, v) => setRating(v ?? 1)}
              size="large"
            />
          </Box>

          <TextField
            label="Ваш отзыв"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            error={!!errors.text}
            helperText={errors.text?.message}
            placeholder="Поделитесь своим мнением о лабораторных работах..."
            {...register('text', {
              required: 'Напишите отзыв',
              minLength: { value: 10, message: 'Минимум 10 символов' },
              maxLength: { value: 500, message: 'Максимум 500 символов' },
            })}
          />

          {success && (
            <Alert severity="success" sx={{ mt: 1.5 }}>{success}</Alert>
          )}

          <MuiButton
            type="submit"
            variant="contained"
            size="large"
            disabled={isSubmitting || loading}
            startIcon={<SendIcon />}
            sx={{ mt: 2, fontWeight: 700 }}
          >
            Отправить отзыв
          </MuiButton>
        </Box>
      </Paper>

      {/* ── Список отзывов ── */}
      <Typography variant="h6" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <CommentIcon sx={{ color: '#61dafb' }} />
        Результат GET /feedback ({reviews.length})
      </Typography>

      {loading && reviews.length === 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Stack spacing={2}>
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} onDelete={handleDelete} />
          ))}
        </Stack>
      )}
    </Box>
  );
}

export default FeedbackPage;
