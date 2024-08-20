import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import WeatherPage from './components/Shared/WeatherPage/WeatherPage.tsx';
import FavoritesPage from './components/Shared/FavoritesPage/FavoritesPage.tsx';
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
        <h1>Weather App</h1>
          <div className="nav-links">
            <Link to="/">Weather</Link>
            <Link to="/favorites">Favorites</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<WeatherPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
        <Toaster position="bottom-center"/>
      </div>
    </Router>
  );
};

export default App;
