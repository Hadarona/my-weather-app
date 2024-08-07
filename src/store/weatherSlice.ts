import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCurrentWeather, fetchFiveDayForecast } from '../api/accuWeather';
import { iWeatherProps, iForecastProps } from '../api/types';

export interface WeatherState { 
  query: string;
  weather?: iWeatherProps;
  forecast?: iForecastProps;
  loading: boolean;
  error?: string;
  selectedCity: {cityName: string, cityCode: string} | null;
}

const initialState: WeatherState = {
  query: '',
  weather: undefined,
  forecast: undefined,
  loading: false,
  error: undefined,
  selectedCity: null,
};

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (locationKey: string) => {
    const [weatherData, forecastData] = await Promise.all([
      fetchCurrentWeather(locationKey),
      fetchFiveDayForecast(locationKey),
    ]);
    return { weatherData, forecastData };
  }
);

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setSelectedCity: (state, action) => {
      state.selectedCity = action.payload;
    },
    clearWeather: (state) => {
      state.weather = undefined;
      state.forecast = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.pending, (state) => {
      state.loading = true;
      state.error = undefined;
    });
    builder.addCase(fetchWeather.fulfilled, (state, action) => {
      state.weather = action.payload.weatherData;
      state.forecast = action.payload.forecastData;
      state.loading = false;
    });
    builder.addCase(fetchWeather.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { setQuery, clearWeather, setSelectedCity } = weatherSlice.actions;
export default weatherSlice.reducer;