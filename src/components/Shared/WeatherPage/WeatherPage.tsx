import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store/store';
import { setQuery, fetchWeather, setSelectedCity } from '../../../store/weatherSlice';
import { addFavorite } from '../../../store/favoritesSlice';
import AsyncSelect from 'react-select/async';
import { fetchLocations } from '../../../api/accuWeather';
import { SingleValue } from 'react-select';
import { toast } from 'react-hot-toast';


interface IWeatherPageProps {
    value: string;
    label: string;
  }

  const WeatherPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { query, weather, forecast, loading, error, selectedCity } = useSelector((state: RootState) => state.weather);
    const { unit } = useSelector((state: RootState) => state.unit);
  
    const handleGetWeather = async (locationKey: string, cityName: string) => {
      try {
        dispatch(setSelectedCity({cityName: cityName, cityCode: locationKey})); 
        dispatch(fetchWeather(locationKey)).unwrap();
        toast.success(`Received weather for ${cityName}`);
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
  
    const handleAddFavorite = (locationKey: string, cityName: string) => {
      dispatch(addFavorite({ locationKey, cityName }));
      toast.success(`Added ${cityName} to favorites`);
    };
  
    return (
      <div>
        <h1>Weather App</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        
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
          placeholder="Enter city initials"
          loadOptions={fetchAutoComplete}
        />
        
        {selectedCity && <h2>{selectedCity.cityName}</h2>}
        {weather && (
          <div>
            <h3>Current Weather</h3>
            <p>{unit === 'C' ? weather.Temperature.Metric.Value : weather.Temperature.Imperial.Value} {unit}</p>
            <button onClick={() => handleAddFavorite(selectedCity ? selectedCity.cityCode : "", selectedCity ? selectedCity.cityName : "")}>Add to Favorites</button>
          </div>
        )}
  
        {forecast && (
          <div>
            <h3>5-Day Forecast</h3>
            <ul>
              {forecast.DailyForecasts.map((day: any, index: number) => (
                <li key={index}>
                  <p>Date: {day.Date}</p>
                  <p>Min: {day.Temperature.Minimum.Value} °{unit}</p>
                  <p>Max: {day.Temperature.Maximum.Value} °{unit}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
  
        
      </div>
    );
  };
  
  export default WeatherPage;
  