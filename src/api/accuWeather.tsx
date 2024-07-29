import axios from 'axios';
import config from './config';
import {ILocationsProps, iWeatherProps, iForecastProps} from './types';


// Location Autocomplete
export const fetchLocations = async (initials: string): Promise<ILocationsProps[]> => {
    const response = await axios.get(`${config.BASE_URL}/locations/v1/cities/autocomplete`, {
      params: {
        apikey: config.API_KEY,
        q: initials,
        language: 'en-us'
      },
    });
    console.log(response.data)
    return response.data;
  };

// Current Weather Conditions
export const fetchCurrentWeather = async (locationKey: string): Promise<iWeatherProps> => {
  const response = await axios.get(`${config.BASE_URL}/currentconditions/v1/${locationKey}`, {
    params: {
      apikey: config.API_KEY,
      language: 'en-us',
      details: true
    },
  });
  return response.data;
};

// 5-Day Weather Forecasts
export const fetchFiveDayForecast = async (locationKey: string): Promise<iForecastProps> => {
  const response = await axios.get(`${config.BASE_URL}/forecasts/v1/daily/5day/${locationKey}`, {
    params: {
      apikey: config.API_KEY,
      language: 'en-us',
      details: false,
      metric: true
    },
  });
  return response.data;
};