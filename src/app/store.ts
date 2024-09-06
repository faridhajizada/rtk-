import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from '../features/Categories';

export const store: any = configureStore({
  reducer: {
    categories: categoriesReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
