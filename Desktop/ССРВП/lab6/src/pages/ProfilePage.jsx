import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  Box, Typography, Paper, TextField, Button as MuiButton,
  Alert, Divider, Avatar, Stack, CircularProgress, Chip,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SaveIcon          from '@mui/icons-material/Save';
import EditIcon          from '@mui/icons-material/Edit';

import { updateUserProfile, clearUsersStatus } from '../store/usersSlice';
import { updateAuthUser }                       from '../store/authSlice';

/* ─────────────────────────────────────── ProfilePage ── */
function ProfilePage() {
  const dispatch = useDispatch();
  const user     = useSelector((s) => s.auth.user);
  const { loading, error, success } = useSelector((s) => s.users);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      name:  user?.name  ?? '',
      email: user?.email ?? '',
    },
  });

  /* Сбрасываем статус при уходе со страницы */
  useEffect(() => {
    return () => { dispatch(clearUsersStatus()); };
  }, [dispatch]);

  /* Обновляем дефолтные значения формы если user изменился */
  useEffect(() => {
    if (user) {
      reset({ name: user.name, email: user.email });
    }
  }, [user, reset]);

  /** PUT /users/:id — обновить профиль через Redux async thunk */
  const onSubmit = useCallback(async (data) => {
    if (!user?.id) return;

    const updatedData = {
      ...user,
      name:  data.name,
      email: data.email,
    };

    const result = await dispatch(updateUserProfile({ id: user.id, data: updatedData }));
    if (updateUserProfile.fulfilled.match(result)) {
      // Обновляем пользователя в auth store (и localStorage)
      dispatch(updateAuthUser({ name: data.name, email: data.email }));
    }
  }, [dispatch, user]);

  const initials = user?.name
    ? user.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
    : '?';

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 600 }}>
      <Typography variant="h4" fontWeight={800} gutterBottom>
        Профиль пользователя
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Редактирование профиля через <code>PUT /users/:id</code> с помощью <code>axios</code> + <code>Redux Toolkit</code>.
      </Typography>

      {/* ── Карточка текущего профиля ── */}
      <Paper
        variant="outlined"
        sx={{ p: 3, mb: 3, borderRadius: 3, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}
      >
        <Avatar
          sx={{
            bgcolor: '#1a1a2e',
            width: 64,
            height: 64,
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          {initials}
        </Avatar>
        <Box>
          <Typography variant="h6" fontWeight={700}>{user?.name}</Typography>
          <Typography variant="body2" color="text.secondary">{user?.email}</Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            <Chip label={`@${user?.login}`} size="small" variant="outlined" />
          </Stack>
        </Box>
      </Paper>

      {/* ── Форма редактирования ── */}
      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EditIcon sx={{ color: '#61dafb' }} />
          Редактировать профиль — PUT /users/{user?.id}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            label="Имя"
            fullWidth
            margin="normal"
            autoComplete="name"
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register('name', {
              required: 'Имя обязательно',
              minLength: { value: 2, message: 'Минимум 2 символа' },
              maxLength: { value: 50, message: 'Максимум 50 символов' },
            })}
          />

          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            autoComplete="email"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email', {
              required: 'Email обязателен',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Введите корректный email',
              },
            })}
          />

          <TextField
            label="Логин"
            fullWidth
            margin="normal"
            value={user?.login ?? ''}
            disabled
            helperText="Логин изменить нельзя"
            InputProps={{ readOnly: true }}
          />

          {error   && <Alert severity="error"   sx={{ mt: 1.5 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mt: 1.5 }}>{success}</Alert>}

          <MuiButton
            type="submit"
            variant="contained"
            size="large"
            disabled={loading || !isDirty}
            startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <SaveIcon />}
            sx={{ mt: 2, fontWeight: 700 }}
          >
            {loading ? 'Сохранение...' : 'Сохранить изменения'}
          </MuiButton>
        </Box>
      </Paper>

      {/* ── Подсказка по API ── */}
      <Paper
        variant="outlined"
        sx={{
          p: 2, mt: 3, borderRadius: 2,
          bgcolor: 'action.hover',
          fontFamily: 'monospace',
          fontSize: 13,
        }}
      >
        <Typography variant="caption" component="div" fontWeight={700} sx={{ mb: 1 }}>
          <AccountCircleIcon sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
          HTTP-запросы этой страницы:
        </Typography>
        <Box component="pre" sx={{ m: 0, fontSize: 12, whiteSpace: 'pre-wrap' }}>
{`GET    /users?login=${user?.login ?? '...'}    ← авторизация
PUT    /users/${user?.id ?? '1'}               ← обновление профиля`}
        </Box>
      </Paper>
    </Box>
  );
}

export default ProfilePage;
