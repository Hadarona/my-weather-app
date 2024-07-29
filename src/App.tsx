import React, { useState } from 'react';
import './App.css'
import { fetchLocations, fetchCurrentWeather, fetchFiveDayForecast } from './api/accuWeather';
import { ILocationsProps, iWeatherProps, iForecastProps } from './api/types';

const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [locations, setLocations] = useState<ILocationsProps[]>([]);
  const [weather, setWeather] = useState<iWeatherProps>();
  const [forecast, setForecast] = useState<iForecastProps>();

  const handleSearch = async () => {
    const locationData = await fetchLocations(query);
    setLocations(locationData);
  };

  const handleGetWeather = async (locationKey: string) => {
    const weatherData = await fetchCurrentWeather(locationKey);
    setWeather(weatherData);

    const forecastData = await fetchFiveDayForecast(locationKey);
    setForecast(forecastData);
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter city initials"
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        <h2>Locations</h2>
        <ul>
          {locations.map((location: any) => (
            <li key={location.Key}>
              {location.LocalizedName}
              <button onClick={() => handleGetWeather(location.Key)}>Get Weather</button>
            </li>
          ))}
        </ul>
      </div>

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
