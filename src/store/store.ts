import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice.ts';
import favoritesReducer from './favoritesSlice.ts';
import unitReducer from './unitSlice.ts';
import temperatureReducer from './temperatureSlice.ts'

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    favorites: favoritesReducer,
    unit: unitReducer,
    temperature: temperatureReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
