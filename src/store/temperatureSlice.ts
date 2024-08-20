import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchCurrentWeather } from '../api/accuWeather';
import { iWeatherProps } from '../api/types';

export interface TemperatureState {
  data: { [key: string]: number };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: TemperatureState = {
  data: {},
  status: 'idle',
};

export const fetchTemperatureForFavorites = createAsyncThunk(
  'temperature/fetchTemperatureForFavorites',
  async (locationKey: string, { getState }) => {
    const state = getState() as { unit: { unit: '°C' | '°F' } };
    const weatherData: iWeatherProps = await fetchCurrentWeather(locationKey);
    return {
      locationKey,
      temperature: state.unit.unit === '°C' ? weatherData.Temperature.Metric.Value : weatherData.Temperature.Imperial.Value,
    };
  }
);

const temperatureSlice = createSlice({
  name: 'temperature',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTemperatureForFavorites.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTemperatureForFavorites.fulfilled, (state, action: PayloadAction<{ locationKey: string; temperature: number }>) => {
        state.data[action.payload.locationKey] = action.payload.temperature;
        state.status = 'succeeded';
      })
      .addCase(fetchTemperatureForFavorites.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default temperatureSlice.reducer;
