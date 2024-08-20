import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTemperatureForFavorites } from "../../../store/temperatureSlice";
import { RootState, AppDispatch } from "../../../store/store";
import { removeFavorite } from "../../../store/favoritesSlice";
import { fetchWeather, setWeatherText } from "../../../store/weatherSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./FavoritesPage.css";

const FavoritesPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { favorites } = useSelector((state: RootState) => state.favorites);
  const { weatherText } = useSelector((state: RootState) => state.weather);
  const { data } = useSelector((state: RootState) => state.temperature);
  const { unit } = useSelector((state: RootState) => state.unit);

  const navigate = useNavigate();

  useEffect(() => {
    favorites.forEach((favorite) => {
      dispatch(fetchTemperatureForFavorites(favorite.locationKey));
    });
  }, [dispatch, favorites]);

  const handleGetWeather = async (locationKey: string) => {
    try {
      const resultAction = await dispatch(fetchWeather(locationKey)).unwrap();
      dispatch(setWeatherText(resultAction.weatherData.WeatherText));
    } catch (error) {
      toast.error("Failed to receive weather data");
    }
  };
    useEffect(() => {
      favorites.forEach((favorite) => {
        dispatch(fetchTemperatureForFavorites(favorite.locationKey));
        handleGetWeather(favorite.locationKey);
      });
    }, [dispatch, favorites]);
  
  const handleRemoveFavorite = (locationKey: string) => {
    dispatch(removeFavorite(locationKey));
    toast.success("Removed from favorites");
  };

  const handleGoToWeatherPage = () => {
    navigate("/");
  };

  return (
    <div className="favorites-container">
      <div className="favorites-list">
        {favorites.map(
          (
            favorite: { locationKey: string; cityName: string },
            index: number
          ) => (
            <div className="favorite-card" key={index}>
              <div className="texts">
                <p>{favorite.cityName}</p>
                {data[favorite.locationKey] !== undefined ? (
                  <p className="degrees">
                    {data[favorite.locationKey]} {unit}
                  </p>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
              <div className="weather-texts">
                {weatherText && <p>{weatherText}</p>}
              </div>
              <button className="go-to" onClick={handleGoToWeatherPage}>Show 5 day forcast</button>
              <button className="trash" onClick={() => handleRemoveFavorite(favorite.locationKey)}>🗑️</button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
