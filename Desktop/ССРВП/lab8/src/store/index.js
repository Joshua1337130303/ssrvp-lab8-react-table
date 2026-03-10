import { configureStore } from '@reduxjs/toolkit';
import counterReducer  from './counterSlice';
import authReducer     from './authSlice';
import feedbackReducer from './feedbackSlice';
import usersReducer    from './usersSlice';
import adminReducer    from './adminSlice';
import { postsApi }   from '../api/postsApi';

const store = configureStore({
  reducer: {
    counter:  counterReducer,
    auth:     authReducer,
    feedback: feedbackReducer,
    users:    usersReducer,
    admin:    adminReducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});

export default store;
