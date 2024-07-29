import React, { useCallback, useEffect, useState } from 'react';
import './App.css'
import { fetchLocations, fetchCurrentWeather, fetchFiveDayForecast } from './api/accuWeather';
import { iCityProps, iWeatherProps, iForecastProps } from './api/types';

import AsyncSelect from 'react-select/async';


const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState<iWeatherProps>();
  const [forecast, setForecast] = useState<iForecastProps>();

  const handleGetWeather = async (locationKey: string, cityName: string) => {
    console.log("called function with", locationKey, cityName);
    
    const weatherData = await fetchCurrentWeather(locationKey);
    setWeather(weatherData);

    const forecastData = await fetchFiveDayForecast(locationKey);
    setForecast(forecastData);
  };

  const fetchAutoComplete = useCallback(async () => {
    const results = await fetchLocations(query);
    return results.map((obj) => ({
      value: obj.Key,
      label: obj.LocalizedName,
    }));
  }, [query])

  return (
    <div>
      <h1>Weather App</h1>

      {/* <button onClick={handleSearch}>Search</button> */}

      <AsyncSelect
        value={query}
        onInputChange={setQuery}
        onChange={({ value, label}) => handleGetWeather(value, label)}
        cacheOptions
        defaultOptions={false}
        placeholder="Enter city initials"
        loadOptions={fetchAutoComplete}
      />

      {weather && (
        <div>
          <h2>Current Weather</h2>
          <p>{weather.Temperature.Metric.Value} {weather.Temperature.Metric.Unit}</p>
        </div>
      )}

      {forecast && (
        <div>
          <h2>5-Day Forecast</h2>
          <ul>
            {forecast.DailyForecasts.map((day: any, index: number) => (
              <li key={index}>
                <p>Date: {day.Date}</p>
                <p>Min: {day.Temperature.Minimum.Value} °C</p>
                <p>Max: {day.Temperature.Maximum.Value} °C</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
