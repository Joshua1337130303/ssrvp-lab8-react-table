import { configureStore } from '@reduxjs/toolkit';
import counterReducer  from './counterSlice';
import authReducer     from './authSlice';
import feedbackReducer from './feedbackSlice';
import usersReducer    from './usersSlice';

const store = configureStore({
  reducer: {
    counter:  counterReducer,
    auth:     authReducer,
    feedback: feedbackReducer,
    users:    usersReducer,
  },
});

export default store;
