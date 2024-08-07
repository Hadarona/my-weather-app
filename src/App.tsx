import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import WeatherPage from './components/Shared/WeatherPage/WeatherPage.tsx';
import FavoritesPage from './components/Shared/FavoritesPage/FavoritesPage.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Weather</Link>
          <Link to="/favorites">Favorites</Link>
        </nav>
        <Routes>
          <Route path="/" element={<WeatherPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
