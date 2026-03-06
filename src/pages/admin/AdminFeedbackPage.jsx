import { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Typography, IconButton, Tooltip, Rating,
  CircularProgress, Alert, Stack, Chip,
} from '@mui/material';
import DeleteIcon    from '@mui/icons-material/Delete';
import RateReviewIcon from '@mui/icons-material/RateReview';
import StarIcon      from '@mui/icons-material/Star';
import CommentIcon   from '@mui/icons-material/Comment';

import { fetchFeedback, removeFeedback } from '../../store/feedbackSlice';
import DataTable from '../../components/DataTable';

/**
 * AdminFeedbackPage — страница управления отзывами (только для admin).
 *
 * Таблица @tanstack/react-table:
 *   - Сортировка по любой колонке
 *   - Перетаскивание колонок
 *   - Виртуализация строк
 *   - Фиксированная первая колонка на мобильных
 *
 * Действие: Удалить отзыв (DELETE /feedback/:id)
 */
export default function AdminFeedbackPage() {
  const dispatch = useDispatch();
  const { items: reviews, loading, error } = useSelector((s) => s.feedback);

  useEffect(() => {
    dispatch(fetchFeedback());
  }, [dispatch]);

  const handleDelete = useCallback((id) => {
    if (!window.confirm('Удалить отзыв?')) return;
    dispatch(removeFeedback(id));
  }, [dispatch]);

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  /* ── Колонки таблицы ── */
  const columns = useMemo(() => [
    {
      id: 'id',
      accessorKey: 'id',
      header: 'ID',
    },
    {
      id: 'name',
      accessorKey: 'name',
      header: 'Автор',
    },
    {
      id: 'rating',
      accessorKey: 'rating',
      header: 'Оценка',
      cell: ({ row }) => (
        <Rating
          value={row.original.rating}
          readOnly
          size="small"
          sx={{ verticalAlign: 'middle' }}
        />
      ),
    },
    {
      id: 'text',
      accessorKey: 'text',
      header: 'Текст',
      cell: ({ row }) => (
        <Typography
          variant="body2"
          sx={{
            maxWidth: 320,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            display: 'block',
          }}
          title={row.original.text}
        >
          {row.original.text}
        </Typography>
      ),
    },
    {
      id: 'date',
      accessorKey: 'date',
      header: 'Дата',
    },
    {
      id: 'actions',
      header: 'Действия',
      enableSorting: false,
      cell: ({ row }) => (
        <Tooltip title="Удалить отзыв">
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDelete(row.original.id)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
  ], [handleDelete]);

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>

      {/* ── Заголовок ── */}
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
        <RateReviewIcon sx={{ color: '#61dafb', fontSize: 32 }} />
        <Typography variant="h4" fontWeight={800}>
          Управление отзывами
        </Typography>
      </Stack>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Таблица <code>@tanstack/react-table</code> с сортировкой, перетаскиванием колонок
        и виртуализацией. Администратор может удалять отзывы (DELETE /feedback/:id).
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error} — убедитесь что json-server запущен (<code>npm run server</code>).
        </Alert>
      )}

      {/* ── Статистика ── */}
      {!loading && reviews.length > 0 && (
        <Stack direction="row" spacing={2} sx={{ mb: 2 }} flexWrap="wrap" alignItems="center">
          <Stack direction="row" spacing={0.5} alignItems="center">
            <CommentIcon sx={{ fontSize: 18, color: '#42a5f5' }} />
            <Chip label={`Отзывов: ${reviews.length}`} size="small" />
          </Stack>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <StarIcon sx={{ fontSize: 18, color: '#ffa726' }} />
            <Chip label={`Ср. оценка: ${avgRating}`} size="small" color="warning" variant="outlined" />
          </Stack>
        </Stack>
      )}

      {/* ── Таблица / Загрузка ── */}
      {loading && !reviews.length ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <DataTable
          columns={columns}
          data={reviews}
          emptyText="Отзывы не найдены"
        />
      )}
    </Box>
  );
}
