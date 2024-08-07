import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice.ts';
import favoritesReducer from './favoritesSlice.ts';
import unitReducer from './unitSlice.ts';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    favorites: favoritesReducer,
    unit: unitReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
