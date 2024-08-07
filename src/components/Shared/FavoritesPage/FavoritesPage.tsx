import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store/store';
import { fetchWeather, setSelectedCity } from '../../../store/weatherSlice';
import { removeFavorite } from '../../../store/favoritesSlice';
import { toast } from 'react-hot-toast';

const FavoritesPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { weather, selectedCity } = useSelector((state: RootState) => state.weather);
  const { favorites } = useSelector((state: RootState) => state.favorites);
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

  const handleRemoveFavorite = (locationKey: string) => {
    dispatch(removeFavorite(locationKey));
    toast.success("Removed from favorites");
  };

  return (
    <div>
      <h1>Favorites</h1>
      {selectedCity && <h2>{selectedCity.cityName}</h2>}
      {weather && (
      <p>Current Weather: {unit === 'C' ? weather.Temperature.Metric.Value : weather.Temperature.Imperial.Value} {unit}</p>
      )}
      <ul>
        {favorites.map((favorite: { locationKey: string; cityName: string }, index: number) => (
          <li key={index}>
            <p>{favorite.cityName}</p>
            <button onClick={() => handleGetWeather(favorite.locationKey, favorite.cityName)}>View</button>
            <button onClick={() => handleRemoveFavorite(favorite.locationKey)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
