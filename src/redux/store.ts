import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'; // add later

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // cart: cartReducer,
    // etc.
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // if using non-serializable like dates/functions
    }),
  devTools: __DEV__,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;