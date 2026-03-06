import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers, deleteUser, updateUser } from '../api/api';

/* ─────────────────────────── Async Thunks ── */

/** GET /users — загрузить всех пользователей */
export const fetchAllUsers = createAsyncThunk(
  'admin/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try { return await getUsers(); }
    catch (err) { return rejectWithValue(err.message); }
  }
);

/** DELETE /users/:id — удалить пользователя */
export const deleteUserById = createAsyncThunk(
  'admin/deleteUserById',
  async (id, { rejectWithValue }) => {
    try { await deleteUser(id); return id; }
    catch (err) { return rejectWithValue(err.message); }
  }
);

/** PATCH /users/:id — заблокировать / разблокировать */
export const toggleBlockUser = createAsyncThunk(
  'admin/toggleBlockUser',
  async ({ id, blocked }, { rejectWithValue }) => {
    try { return await updateUser(id, { blocked }); }
    catch (err) { return rejectWithValue(err.message); }
  }
);

/** PATCH /users/:id — сменить роль */
export const changeUserRole = createAsyncThunk(
  'admin/changeUserRole',
  async ({ id, role }, { rejectWithValue }) => {
    try { return await updateUser(id, { role }); }
    catch (err) { return rejectWithValue(err.message); }
  }
);

/* ─────────────────────────── Slice ── */

const adminSlice = createSlice({
  name: 'admin',
  initialState: { users: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending,   (s) => { s.loading = true; s.error = null; })
      .addCase(fetchAllUsers.fulfilled, (s, a) => { s.loading = false; s.users = a.payload; })
      .addCase(fetchAllUsers.rejected,  (s, a) => { s.loading = false; s.error = a.payload; })
      .addCase(deleteUserById.fulfilled, (s, a) => {
        s.users = s.users.filter((u) => u.id !== a.payload);
      })
      .addCase(toggleBlockUser.fulfilled, (s, a) => {
        const idx = s.users.findIndex((u) => u.id === a.payload.id);
        if (idx !== -1) s.users[idx] = a.payload;
      })
      .addCase(changeUserRole.fulfilled, (s, a) => {
        const idx = s.users.findIndex((u) => u.id === a.payload.id);
        if (idx !== -1) s.users[idx] = a.payload;
      });
  },
});

export default adminSlice.reducer;
