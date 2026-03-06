import { configureStore } from '@reduxjs/toolkit';
import counterReducer  from './counterSlice';
import authReducer     from './authSlice';
import feedbackReducer from './feedbackSlice';
import usersReducer    from './usersSlice';
import adminReducer    from './adminSlice';

const store = configureStore({
  reducer: {
    counter:  counterReducer,
    auth:     authReducer,
    feedback: feedbackReducer,
    users:    usersReducer,
    admin:    adminReducer,
  },
});

export default store;
