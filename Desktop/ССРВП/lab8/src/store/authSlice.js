import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserByLogin } from '../api/api';

/** Читаем начальное состояние из localStorage */
function loadAuthState() {
  try {
    const raw = localStorage.getItem('auth');
    if (raw) return { ...JSON.parse(raw), loading: false, error: null };
  } catch (_) { /* ignore */ }
  return { isAuthenticated: false, user: null, loading: false, error: null };
}

/* ─────────────────────────── Async Thunk: loginUser ── */

/**
 * POST-аналог: GET /users?login=... для поиска пользователя.
 * Проверяем пароль на клиенте (JSON Server не поддерживает авторизацию),
 * что типично для учебного REST-сервера.
 */
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ login, password }, { rejectWithValue }) => {
    try {
      const user = await getUserByLogin(login);
      if (!user) return rejectWithValue('Пользователь не найден. Зарегистрируйтесь.');
      if (user.password !== password) return rejectWithValue('Неверный пароль');
      // Не храним пароль в store
      const { password: _p, ...safeUser } = user;
      return safeUser;
    } catch (err) {
      return rejectWithValue('Ошибка сервера: ' + err.message);
    }
  }
);

/* ─────────────────────────── Slice ── */

/**
 * Redux Toolkit slice для авторизации.
 * Actions: login (sync), logout, loginUser (async thunk)
 * State: { isAuthenticated, user, loading, error }
 */
const authSlice = createSlice({
  name: 'auth',
  initialState: loadAuthState(),
  reducers: {
    /** Синхронный login — используется после регистрации */
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user  = action.payload;
      state.error = null;
      localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, user: action.payload }));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user    = null;
      state.error   = null;
      localStorage.removeItem('auth');
    },
    /** Обновить данные пользователя в store после PUT /users/:id */
    updateAuthUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, user: state.user }));
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading         = false;
        state.isAuthenticated = true;
        state.user            = action.payload;
        localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, user: action.payload }));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });
  },
});

export const { login, logout, updateAuthUser, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
