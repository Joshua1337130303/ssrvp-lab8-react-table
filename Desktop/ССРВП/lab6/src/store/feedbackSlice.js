import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedback, createFeedback, deleteFeedback } from '../api/api';

/* ─────────────────────────── Async Thunks ── */

/** GET /feedback — загрузить все отзывы с сервера */
export const fetchFeedback = createAsyncThunk(
  'feedback/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await getFeedback();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/** POST /feedback — отправить новый отзыв на сервер */
export const addFeedback = createAsyncThunk(
  'feedback/add',
  async (review, { rejectWithValue }) => {
    try {
      return await createFeedback(review);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/** DELETE /feedback/:id — удалить отзыв с сервера */
export const removeFeedback = createAsyncThunk(
  'feedback/remove',
  async (id, { rejectWithValue }) => {
    try {
      await deleteFeedback(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ─────────────────────────── Slice ── */

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    items:   [],
    loading: false,
    error:   null,
  },
  reducers: {},
  extraReducers: (builder) => {
    /* fetchFeedback */
    builder
      .addCase(fetchFeedback.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(fetchFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.items   = action.payload;
      })
      .addCase(fetchFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });

    /* addFeedback */
    builder
      .addCase(addFeedback.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(addFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.items   = [action.payload, ...state.items];
      })
      .addCase(addFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });

    /* removeFeedback */
    builder
      .addCase(removeFeedback.pending, (state) => {
        state.error = null;
      })
      .addCase(removeFeedback.fulfilled, (state, action) => {
        state.items = state.items.filter((r) => r.id !== action.payload);
      })
      .addCase(removeFeedback.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default feedbackSlice.reducer;
