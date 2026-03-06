import axios from 'axios';

/** Базовый URL JSON Server */
const BASE_URL = 'http://localhost:3001';

/** Axios instance с базовыми настройками */
const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

/* ─────────────────────────── FEEDBACK API ── */

/** GET /feedback — получить все отзывы */
export const getFeedback = () => api.get('/feedback').then((r) => r.data);

/** POST /feedback — создать новый отзыв */
export const createFeedback = (review) =>
  api.post('/feedback', review).then((r) => r.data);

/** DELETE /feedback/:id — удалить отзыв */
export const deleteFeedback = (id) =>
  api.delete(`/feedback/${id}`).then((r) => r.data);

/* ─────────────────────────── USERS API ── */

/** GET /users — получить всех пользователей */
export const getUsers = () => api.get('/users').then((r) => r.data);

/** GET /users?login=...  — поиск пользователя по логину */
export const getUserByLogin = (login) =>
  api.get(`/users?login=${login}`).then((r) => r.data[0] ?? null);

/** POST /users — зарегистрировать нового пользователя */
export const createUser = (userData) =>
  api.post('/users', userData).then((r) => r.data);

/** PATCH /users/:id — обновить профиль пользователя (частичное обновление) */
export const updateUser = (id, userData) =>
  api.patch(`/users/${id}`, userData).then((r) => r.data);

/** PATCH /feedback/:id — обновить поле отзыва */
export const patchFeedback = (id, data) =>
  api.patch(`/feedback/${id}`, data).then((r) => r.data);

export default api;
