import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  Box, Paper, Typography, Tab, Tabs, TextField,
  Button as MuiButton, Alert, InputAdornment, IconButton, Divider,
  CircularProgress,
} from '@mui/material';
import SchoolIcon        from '@mui/icons-material/School';
import VisibilityIcon    from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoginIcon         from '@mui/icons-material/Login';
import PersonAddIcon     from '@mui/icons-material/PersonAdd';

import { loginUser, clearAuthError } from '../store/authSlice';
import { registerUser }              from '../store/usersSlice';
import { login }                     from '../store/authSlice';

/* ─────────────────────────────────────── LoginForm ── */
function LoginForm() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((s) => s.auth);
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { login: '', password: '' } });

  /** POST-аналог: GET /users?login=... — авторизация через сервер (async thunk) */
  const onSubmit = useCallback(async (data) => {
    dispatch(clearAuthError());
    dispatch(loginUser({ login: data.login, password: data.password }));
  }, [dispatch]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField
        label="Логин"
        fullWidth
        margin="normal"
        autoComplete="username"
        error={!!errors.login}
        helperText={errors.login?.message}
        {...register('login', {
          required: 'Логин обязателен',
          minLength: { value: 3, message: 'Минимум 3 символа' },
        })}
      />

      <TextField
        label="Пароль"
        type={showPass ? 'text' : 'password'}
        fullWidth
        margin="normal"
        autoComplete="current-password"
        error={!!errors.password}
        helperText={errors.password?.message}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPass((v) => !v)} edge="end" size="small">
                {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...register('password', {
          required: 'Пароль обязателен',
          minLength: { value: 1, message: 'Введите пароль' },
        })}
      />

      {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}

      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
        Демо-доступ: логин <strong>admin</strong> / пароль <strong>admin</strong>
      </Typography>

      <MuiButton
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        disabled={loading}
        startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <LoginIcon />}
        sx={{ mt: 2, py: 1.4, fontWeight: 700 }}
      >
        {loading ? 'Вход...' : 'Войти'}
      </MuiButton>
    </Box>
  );
}

/* ─────────────────────────────────────── RegisterForm ── */
function RegisterForm({ onRegistered }) {
  const dispatch = useDispatch();
  const { loading: usersLoading } = useSelector((s) => s.users);

  const [showPass,    setShowPass]    = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [serverError, setServerError] = useState('');
  const [success,     setSuccess]     = useState('');

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { name: '', login: '', email: '', password: '', confirmPassword: '' },
  });

  const passwordValue = watch('password');

  /** POST /users — регистрация через сервер (async thunk) */
  const onSubmit = useCallback(async (data) => {
    setServerError('');
    setSuccess('');

    const result = await dispatch(registerUser({
      name:     data.name,
      login:    data.login,
      email:    data.email,
      password: data.password,
      role:     'user',
      blocked:  false,
    }));

    if (registerUser.fulfilled.match(result)) {
      // Сразу авторизуем пользователя после регистрации
      const { password: _p, ...safeUser } = result.payload;
      dispatch(login(safeUser));
      setSuccess(`Регистрация прошла успешно! Добро пожаловать, ${data.name}!`);
      reset();
      setTimeout(() => onRegistered?.(), 1500);
    } else {
      setServerError(result.payload ?? 'Ошибка регистрации');
    }
  }, [dispatch, reset, onRegistered]);

  return (
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
        })}
      />

      <TextField
        label="Логин"
        fullWidth
        margin="normal"
        autoComplete="username"
        error={!!errors.login}
        helperText={errors.login?.message}
        {...register('login', {
          required: 'Логин обязателен',
          minLength: { value: 3, message: 'Минимум 3 символа' },
          pattern: {
            value: /^[a-zA-Z0-9_]+$/,
            message: 'Только латинские буквы, цифры и _',
          },
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
        label="Пароль"
        type={showPass ? 'text' : 'password'}
        fullWidth
        margin="normal"
        autoComplete="new-password"
        error={!!errors.password}
        helperText={errors.password?.message}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPass((v) => !v)} edge="end" size="small">
                {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...register('password', {
          required: 'Пароль обязателен',
          minLength: { value: 6, message: 'Минимум 6 символов' },
        })}
      />

      <TextField
        label="Подтверждение пароля"
        type={showConfirm ? 'text' : 'password'}
        fullWidth
        margin="normal"
        autoComplete="new-password"
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowConfirm((v) => !v)} edge="end" size="small">
                {showConfirm ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...register('confirmPassword', {
          required: 'Подтвердите пароль',
          validate: (v) => v === passwordValue || 'Пароли не совпадают',
        })}
      />

      {serverError && <Alert severity="error" sx={{ mt: 1 }}>{serverError}</Alert>}
      {success     && <Alert severity="success" sx={{ mt: 1 }}>{success}</Alert>}

      <MuiButton
        type="submit"
        variant="contained"
        color="success"
        fullWidth
        size="large"
        disabled={usersLoading}
        startIcon={usersLoading ? <CircularProgress size={18} color="inherit" /> : <PersonAddIcon />}
        sx={{ mt: 2, py: 1.4, fontWeight: 700 }}
      >
        {usersLoading ? 'Регистрация...' : 'Зарегистрироваться'}
      </MuiButton>
    </Box>
  );
}

/* ─────────────────────────────────────── AuthPage ── */
function AuthPage() {
  const [tab, setTab] = useState(0);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0d1117 0%, #1a1a2e 50%, #16213e 100%)',
        p: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: '100%',
          maxWidth: 460,
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        {/* ── Шапка ── */}
        <Box
          sx={{
            background: 'linear-gradient(90deg, #1a1a2e 0%, #16213e 100%)',
            p: 3,
            textAlign: 'center',
          }}
        >
          <SchoolIcon sx={{ color: '#61dafb', fontSize: 40, mb: 1 }} />
          <Typography variant="h5" fontWeight={700} color="white">
            ССРВП — Лаб. работа №6
          </Typography>
          <Typography variant="caption" sx={{ color: '#9ab0c6' }}>
            REST API + Redux async thunks
          </Typography>
        </Box>

        {/* ── Вкладки ── */}
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Войти" icon={<LoginIcon />} iconPosition="start" />
          <Tab label="Регистрация" icon={<PersonAddIcon />} iconPosition="start" />
        </Tabs>

        {/* ── Содержимое вкладок ── */}
        <Box sx={{ p: 3 }}>
          {tab === 0 && <LoginForm />}
          {tab === 1 && <RegisterForm onRegistered={() => setTab(0)} />}
        </Box>

        <Divider />
        <Box sx={{ p: 1.5, textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Современные средства разработки веб-приложений
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default AuthPage;
