import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store/store';
import { setQuery, fetchWeather, setSelectedCity, setWeatherText } from '../../../store/weatherSlice';
import { addFavorite } from '../../../store/favoritesSlice';
import AsyncSelect from 'react-select/async';
import { fetchLocations, fetchMyLocation } from '../../../api/accuWeather';
import { SingleValue } from 'react-select';
import { toast } from 'react-hot-toast';
import Button from '../Button/Button.tsx';
import Card from '../Card/Card.tsx';
import UnitSwitch from '../UnitSwitch/UnitSwitch.tsx';
import './WeatherPage.css';
import { iDailyForecastProps } from '../../../api/types.tsx';

interface IWeatherPageProps {
  value: string;
  label: string;
}

const WeatherPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { query, weather, forecast, loading, error, selectedCity, weatherText } = useSelector((state: RootState) => state.weather);
  const { unit } = useSelector((state: RootState) => state.unit);

  const handleGetWeather = async (locationKey: string, cityName: string) => {
    try {
      const resultAction = await dispatch(fetchWeather(locationKey)).unwrap();
      dispatch(setSelectedCity({ cityName: cityName, cityCode: locationKey }));
      dispatch(setWeatherText(resultAction.weatherData.WeatherText));
    } catch (error) {
      toast.error("Failed to receive weather data");
    }
  };

  const fetchAutoComplete = useCallback(async (inputValue: string) => {
    try {
      const results = await fetchLocations(inputValue);
      return results.map((obj) => ({
        value: obj.Key,
        label: `${obj.LocalizedName}, ${obj.Country.LocalizedName}`,
      }));
    } catch (error) {
      toast.error("City is not found");
      return [];
    }
  }, []);

  const handleGetCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const { key, city, country } = await fetchMyLocation(latitude, longitude);
          handleGetWeather(key, `${city}, ${country}`);
        } catch (error) {
          toast.error("Failed to receive your location data");
        }
      }, () => {
        toast.error("Failed to get your location");
      });
    } else {
      toast.error("Your location is not supported by this browser");
    }
  };

  const handleAddFavorite = () => {
    if (selectedCity) {
      dispatch(addFavorite({ locationKey: selectedCity.cityCode, cityName: selectedCity.cityName }));
      toast.success(`${selectedCity.cityName} was added to favorites!`);
    } else {
      toast.error("No city selected to add to favorites");
    }
  };

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      minWidth: 240,
      margin: '0 8px',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
  };

  function formatDateToDayMonth(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    return `${day}/${month}`;
  }

  function getDayOfWeek(dateString: string): string {
    const date = new Date(dateString);
    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const dayOfWeek = date.getDay();
    return daysOfWeek[dayOfWeek];
  }

  function getImagePath(weatherIcon: number): string {
    return weatherIcon === 1 ? "src/icons/sun.svg" :
           weatherIcon === 2 ? "src/icons/sun.svg" :
           weatherIcon === 3 ? "src/icons/cloudy-sun.svg" :
           weatherIcon === 4 ? "src/icons/cloudy.svg" :
           weatherIcon === 5 ? "src/icons/haze.svg" :
           weatherIcon === 6 ? "src/icons/cloudy.svg" :
           weatherIcon === 7 ? "src/icons/cloudy.svg" :
           weatherIcon === 8 ? "src/icons/cloudy.svg" :
           weatherIcon === 11 ? "src/icons/fog.svg" :
           weatherIcon === 12 ? "src/icons/rain.svg" :
           weatherIcon === 13 ? "src/icons/rain.svg" :
           weatherIcon === 14 ? "src/icons/sun-rain.svg" :
           weatherIcon === 15 ? "src/icons/thunder-shower.svg" :
           weatherIcon === 16 ? "src/icons/thunder-shower.svg" :
           weatherIcon === 17 ? "src/icons/thunder-shower.svg" :
           weatherIcon === 18 ? "src/icons/rain.svg" :
           weatherIcon === 19 ? "src/icons/rain-and-snow.svg" :
           weatherIcon === 20 ? "src/icons/rain-and-snow.svg" :
           weatherIcon === 21 ? "src/icons/rain-and-snow.svg" :
           weatherIcon === 22 ? "src/icons/snow.svg" :
           weatherIcon === 23 ? "src/icons/snow.svg" :
           weatherIcon === 24 ? "src/icons/freezing-rain.svg" :
           weatherIcon === 25 ? "src/icons/rain-and-snow.svg" :
           weatherIcon === 26 ? "src/icons/freezing-rain.svg" :
           weatherIcon === 29 ? "src/icons/rain-and-snow.svg" :
           weatherIcon === 30 ? "src/icons/high-temperature.svg" :
           weatherIcon === 31 ? "src/icons/cold.svg" :
           weatherIcon === 32 ? "src/icons/cloud-windy.svg" :
           weatherIcon === 33 ? "src/icons/moon.svg" :
           weatherIcon === 34 ? "src/icons/moon.svg" :
           weatherIcon === 35 ? "src/icons/moon-cloudy.svg" :
           weatherIcon === 36 ? "src/icons/cloudy.svg" :
           weatherIcon === 37 ? "src/icons/haze.svg" :
           weatherIcon === 38 ? "src/icons/cloudy.svg" :
           weatherIcon === 39 ? "src/icons/moon-rain.svg" :
           weatherIcon === 40 ? "src/icons/rain.svg" :
           weatherIcon === 41 ? "src/icons/thunder-shower.svg" :
           weatherIcon === 42 ? "src/icons/thunder-shower.svg" :
           weatherIcon === 43 ? "src/icons/rain-and-snow.svg" :
           weatherIcon === 44 ? "src/icons/rain-and-snow.svg" :
           "src/icons/no-icon.svg";
  }

  return (
    <div className='weather-container'>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      
      <div className="weather-controls">
        <AsyncSelect
          value={query ? { value: query, label: query } : null}
          onInputChange={(inputValue) => dispatch(setQuery(inputValue))}
          onChange={(selectedOption: SingleValue<IWeatherPageProps>) => {
            if (selectedOption) {
              handleGetWeather(selectedOption.value, selectedOption.label);
            }
          }}
          cacheOptions
          defaultOptions={false}
          styles={customStyles}
          placeholder="Enter city initials"
          loadOptions={fetchAutoComplete}
        />
        <Button onClick={handleAddFavorite}>⭐ Add to Favorites</Button>
      </div>

      <Button onClick={handleGetCurrentLocationWeather}>📍 My Location</Button>
      <div className='city-weather'>
        {selectedCity && <h2>{selectedCity.cityName}</h2>}
        {weatherText && <p>{weatherText}</p>}
      </div>
      {weather && (
        <Card title="" className="weather-current">
          <UnitSwitch />
          <h1>{unit === '°C' ? weather.Temperature.Metric.Value : weather.Temperature.Imperial.Value} {unit}</h1>
        </Card>
      )}

      {forecast && (
          <div className="weather-forecast">
            <ul>
              {forecast.DailyForecasts.map((day: iDailyForecastProps, index: number) => (
                <Card key={index} title={`${formatDateToDayMonth(day.Date)}\u00A0\u00A0\u00A0\u00A0${getDayOfWeek(day.Date)}`}>
                  <p className='minmax-weather'>{unit === '°C' ? day.Temperature.Maximum.Value : ((day.Temperature.Maximum.Value * 9/5) + 32).toFixed(1)} {unit} / {unit === '°C' ? day.Temperature.Minimum.Value : ((day.Temperature.Minimum.Value * 9/5) + 32).toFixed(1)} {unit}</p>
                  <img src={getImagePath(day.Day.Icon)} alt="" />
                  <img src={getImagePath(day.Night.Icon)} alt="" />
                </Card>
              ))}
            </ul>
          </div>
      )}
    </div>

  );
};

export default WeatherPage;
