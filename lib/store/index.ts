import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import studentReducer from './slices/studentSlice';
import parentReducer from './slices/parentSlice';
import teacherReducer from './slices/teacherSlice';
import adminReducer from './slices/adminSlice';
import doctorReducer from './slices/doctorSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    student: studentReducer,
    parent: parentReducer,
    teacher: teacherReducer,
    admin: adminReducer,
    doctor: doctorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
