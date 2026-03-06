import { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Typography, IconButton, Tooltip, Chip,
  CircularProgress, Alert, Stack,
} from '@mui/material';
import DeleteIcon              from '@mui/icons-material/Delete';
import BlockIcon               from '@mui/icons-material/Block';
import CheckCircleIcon         from '@mui/icons-material/CheckCircle';
import AdminPanelSettingsIcon  from '@mui/icons-material/AdminPanelSettings';
import PersonIcon              from '@mui/icons-material/Person';
import PeopleIcon              from '@mui/icons-material/People';

import {
  fetchAllUsers,
  deleteUserById,
  toggleBlockUser,
  changeUserRole,
} from '../../store/adminSlice';
import DataTable        from '../../components/DataTable';
import { useCurrentUser } from '../../hooks/useLoginState';

/**
 * AdminUsersPage — страница управления пользователями (только для admin).
 *
 * Таблица @tanstack/react-table:
 *   - Сортировка по любой колонке
 *   - Перетаскивание колонок (@dnd-kit)
 *   - Виртуализация строк (@tanstack/react-virtual)
 *   - Фиксированная первая колонка на мобильных
 *
 * Действия: Заблокировать/Разблокировать, Сменить роль, Удалить.
 */
export default function AdminUsersPage() {
  const dispatch    = useDispatch();
  const { users, loading, error } = useSelector((s) => s.admin);
  const currentUser = useCurrentUser();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleDelete = useCallback((id) => {
    if (!window.confirm('Удалить пользователя? Это действие необратимо.')) return;
    dispatch(deleteUserById(id));
  }, [dispatch]);

  const handleToggleBlock = useCallback((id, blocked) => {
    dispatch(toggleBlockUser({ id, blocked: !blocked }));
  }, [dispatch]);

  const handleChangeRole = useCallback((id, role) => {
    dispatch(changeUserRole({ id, role: role === 'admin' ? 'user' : 'admin' }));
  }, [dispatch]);

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
      header: 'Имя',
    },
    {
      id: 'login',
      accessorKey: 'login',
      header: 'Логин',
    },
    {
      id: 'email',
      accessorKey: 'email',
      header: 'Email',
    },
    {
      id: 'role',
      accessorKey: 'role',
      header: 'Роль',
      cell: ({ row }) => (
        <Chip
          label={row.original.role === 'admin' ? 'Admin' : 'User'}
          size="small"
          color={row.original.role === 'admin' ? 'primary' : 'default'}
          variant={row.original.role === 'admin' ? 'filled' : 'outlined'}
        />
      ),
    },
    {
      id: 'blocked',
      accessorKey: 'blocked',
      header: 'Статус',
      cell: ({ row }) => (
        <Chip
          label={row.original.blocked ? 'Заблокирован' : 'Активен'}
          size="small"
          color={row.original.blocked ? 'error' : 'success'}
        />
      ),
    },
    {
      id: 'actions',
      header: 'Действия',
      enableSorting: false,
      cell: ({ row }) => {
        const u      = row.original;
        const isSelf = u.id === currentUser?.id;
        return (
          <Stack direction="row" spacing={0.5}>
            {/* Блокировка */}
            <Tooltip title={u.blocked ? 'Разблокировать' : 'Заблокировать'}>
              <span>
                <IconButton
                  size="small"
                  color={u.blocked ? 'success' : 'warning'}
                  disabled={isSelf}
                  onClick={() => handleToggleBlock(u.id, u.blocked)}
                >
                  {u.blocked
                    ? <CheckCircleIcon fontSize="small" />
                    : <BlockIcon fontSize="small" />}
                </IconButton>
              </span>
            </Tooltip>

            {/* Смена роли */}
            <Tooltip title={u.role === 'admin' ? 'Снять права admin' : 'Назначить admin'}>
              <span>
                <IconButton
                  size="small"
                  color={u.role === 'admin' ? 'secondary' : 'inherit'}
                  disabled={isSelf}
                  onClick={() => handleChangeRole(u.id, u.role)}
                >
                  {u.role === 'admin'
                    ? <AdminPanelSettingsIcon fontSize="small" />
                    : <PersonIcon fontSize="small" />}
                </IconButton>
              </span>
            </Tooltip>

            {/* Удаление */}
            <Tooltip title="Удалить пользователя">
              <span>
                <IconButton
                  size="small"
                  color="error"
                  disabled={isSelf}
                  onClick={() => handleDelete(u.id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </span>
            </Tooltip>
          </Stack>
        );
      },
    },
  ], [currentUser?.id, handleToggleBlock, handleChangeRole, handleDelete]);

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>

      {/* ── Заголовок ── */}
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
        <PeopleIcon sx={{ color: '#61dafb', fontSize: 32 }} />
        <Typography variant="h4" fontWeight={800}>
          Управление пользователями
        </Typography>
      </Stack>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        <code>@tanstack/react-table</code> + <code>@dnd-kit</code> + <code>@tanstack/react-virtual</code>.
        Сортировка по клику на заголовок, перетаскивание колонок за иконку ⠿,
        виртуализация строк при скролле. На мобильных первая колонка зафиксирована.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error} — убедитесь что json-server запущен (<code>npm run server</code>).
        </Alert>
      )}

      {/* ── Статистика ── */}
      {!loading && users.length > 0 && (
        <Stack direction="row" spacing={2} sx={{ mb: 2 }} flexWrap="wrap">
          <Chip label={`Всего: ${users.length}`} size="small" />
          <Chip
            label={`Активных: ${users.filter((u) => !u.blocked).length}`}
            size="small"
            color="success"
          />
          <Chip
            label={`Заблокировано: ${users.filter((u) => u.blocked).length}`}
            size="small"
            color="error"
            variant="outlined"
          />
          <Chip
            label={`Администраторов: ${users.filter((u) => u.role === 'admin').length}`}
            size="small"
            color="primary"
            variant="outlined"
          />
        </Stack>
      )}

      {/* ── Таблица / Загрузка ── */}
      {loading && !users.length ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <DataTable
          columns={columns}
          data={users}
          emptyText="Пользователи не найдены"
        />
      )}
    </Box>
  );
}
