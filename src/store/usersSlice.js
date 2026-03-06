import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserByLogin, createUser, updateUser } from '../api/api';

/* ─────────────────────────── Async Thunks ── */

/** GET /users?login=... — найти пользователя по логину (для логина) */
export const fetchUserByLogin = createAsyncThunk(
  'users/fetchByLogin',
  async (login, { rejectWithValue }) => {
    try {
      return await getUserByLogin(login);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/** POST /users — зарегистрировать нового пользователя */
export const registerUser = createAsyncThunk(
  'users/register',
  async (userData, { rejectWithValue }) => {
    try {
      // Проверяем что логин не занят
      const existing = await getUserByLogin(userData.login);
      if (existing) {
        return rejectWithValue('Пользователь с таким логином уже существует');
      }
      return await createUser(userData);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/** PUT /users/:id — обновить профиль пользователя */
export const updateUserProfile = createAsyncThunk(
  'users/updateProfile',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await updateUser(id, data);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ─────────────────────────── Slice ── */

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    loading: false,
    error:   null,
    success: null,
  },
  reducers: {
    clearUsersStatus: (state) => {
      state.error   = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    /* registerUser */
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error   = null;
        state.success = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = 'Регистрация прошла успешно!';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });

    /* updateUserProfile */
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error   = null;
        state.success = null;
      })
      .addCase(updateUserProfile.fulfilled, (state) => {
        state.loading = false;
        state.success = 'Профиль успешно обновлён!';
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });
  },
});

export const { clearUsersStatus } = usersSlice.actions;
export default usersSlice.reducer;
