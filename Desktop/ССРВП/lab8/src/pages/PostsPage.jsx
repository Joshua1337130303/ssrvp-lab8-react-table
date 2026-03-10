import {
  Box, Typography, Paper, Stack, Chip, Alert,
  CircularProgress, Card, CardContent, Divider,
  IconButton, Tooltip,
} from '@mui/material';
import RefreshIcon    from '@mui/icons-material/Refresh';
import ArticleIcon    from '@mui/icons-material/Article';
import CalendarIcon   from '@mui/icons-material/CalendarToday';
import PersonIcon     from '@mui/icons-material/Person';
import CategoryIcon   from '@mui/icons-material/Category';
import SyncIcon       from '@mui/icons-material/Sync';

import { useGetPostsQuery } from '../api/postsApi';

/* ─────────────────────── PostCard ── */
function PostCard({ post }) {
  return (
    <Card variant="outlined" sx={{ borderRadius: 3, transition: 'box-shadow .2s', '&:hover': { boxShadow: 4 } }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" gap={1} sx={{ mb: 1 }}>
          <Typography variant="subtitle1" fontWeight={700}>{post.title}</Typography>
          <Chip label={post.category} size="small" color="primary" variant="outlined" icon={<CategoryIcon />} />
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {post.body}
        </Typography>

        <Stack direction="row" spacing={2} flexWrap="wrap" gap={0.5}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <PersonIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">{post.author}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <CalendarIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">{post.date}</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

/* ─────────────────────── PostsPage ── */
/**
 * PostsPage — страница постов с RTK Query.
 * Демонстрация useGetPostsQuery + isLoading / isFetching / isError.
 */
function PostsPage() {
  const {
    data: posts,
    isLoading,
    isFetching,
    isError,
    isSuccess,
    error,
    refetch,
  } = useGetPostsQuery();

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 800, mx: 'auto' }}>

      {/* ── Заголовок ── */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
        <Box>
          <Typography variant="h4" fontWeight={800} gutterBottom>
            RTK Query
          </Typography>
          <Typography color="text.secondary">
            Список постов с сервера через <code>useGetPostsQuery</code>.
            Состояния: <code>isLoading</code>, <code>isFetching</code>, <code>isError</code>.
          </Typography>
        </Box>

        {/* Кнопка обновления */}
        <Tooltip title="Обновить данные (refetch)">
          <IconButton onClick={refetch} color="primary" disabled={isFetching}>
            <SyncIcon sx={{ animation: isFetching ? 'spin 1s linear infinite' : 'none',
              '@keyframes spin': { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } } }} />
          </IconButton>
        </Tooltip>
      </Stack>

      {/* ── Статус-бейджи ── */}
      <Stack direction="row" spacing={1} flexWrap="wrap" gap={0.5} sx={{ mb: 3 }}>
        <Chip
          label={`isLoading: ${isLoading}`}
          size="small"
          color={isLoading ? 'warning' : 'default'}
          variant={isLoading ? 'filled' : 'outlined'}
        />
        <Chip
          label={`isFetching: ${isFetching}`}
          size="small"
          color={isFetching ? 'info' : 'default'}
          variant={isFetching ? 'filled' : 'outlined'}
        />
        <Chip
          label={`isError: ${isError}`}
          size="small"
          color={isError ? 'error' : 'default'}
          variant={isError ? 'filled' : 'outlined'}
        />
        <Chip
          label={`isSuccess: ${isSuccess}`}
          size="small"
          color={isSuccess ? 'success' : 'default'}
          variant={isSuccess ? 'filled' : 'outlined'}
        />
      </Stack>

      <Divider sx={{ mb: 3 }} />

      {/* ── isLoading: первая загрузка ── */}
      {isLoading && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8, gap: 2 }}>
          <CircularProgress size={56} thickness={4} />
          <Typography color="text.secondary">Загрузка постов...</Typography>
        </Box>
      )}

      {/* ── isError: ошибка ── */}
      {isError && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          action={
            <Tooltip title="Повторить запрос">
              <IconButton color="inherit" size="small" onClick={refetch}>
                <RefreshIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          }
        >
          <Typography fontWeight={700} gutterBottom>Ошибка загрузки данных</Typography>
          <Typography variant="body2">
            {error?.status === 'FETCH_ERROR'
              ? 'Сервер недоступен. Убедитесь, что json-server запущен на порту 3001.'
              : `Код ошибки: ${error?.status ?? 'неизвестно'}`}
          </Typography>
        </Alert>
      )}

      {/* ── isFetching (но не первая загрузка): обновление данных ── */}
      {isFetching && !isLoading && (
        <Alert severity="info" icon={<SyncIcon />} sx={{ mb: 2 }}>
          Обновление данных...
        </Alert>
      )}

      {/* ── isSuccess: список постов ── */}
      {isSuccess && (
        <>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <ArticleIcon color="action" />
            <Typography variant="body2" color="text.secondary">
              Загружено постов: <strong>{posts.length}</strong>
            </Typography>
          </Stack>

          <Stack spacing={2}>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </Stack>
        </>
      )}

      {/* ── Пояснение ── */}
      <Paper variant="outlined" sx={{ p: 3, mt: 4, borderRadius: 3, bgcolor: 'action.hover' }}>
        <Typography variant="subtitle2" fontWeight={700} gutterBottom>
          Как это работает
        </Typography>
        <Typography variant="body2" color="text.secondary" component="div">
          <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
            <li><code>isLoading</code> — <strong>true</strong> только при первом запросе (нет кэша)</li>
            <li><code>isFetching</code> — <strong>true</strong> при любом запросе, включая refetch</li>
            <li><code>isError</code> — <strong>true</strong> при ошибке сети или сервера</li>
            <li><code>isSuccess</code> — <strong>true</strong> при успешном ответе</li>
            <li>Данные кэшируются автоматически — повторные запросы не ходят на сервер</li>
          </ul>
        </Typography>
      </Paper>
    </Box>
  );
}

export default PostsPage;
