import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import WeatherPage from "./components/Shared/WeatherPage/WeatherPage.tsx";
import FavoritesPage from "./components/Shared/FavoritesPage/FavoritesPage.tsx";
import { Toaster } from "react-hot-toast";
import Hamburger from "hamburger-react";
import { useIsMobile } from "./app/hooks.ts";

const MobileNav = ({ isOpen, doClose }: { isOpen: boolean, doClose: () => void }) => {
  return (
    <div className="mobile-nav" data-is-open={isOpen}>
      <Link onClick={doClose} to="/">Weather</Link>
      <Link onClick={doClose} to="/favorites">Favorites</Link>
    </div>
  );
};

const App: React.FC = () => {
  const isMobile = useIsMobile();
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (!isMobile && isOpen) {
      setOpen(false);
    }
  }, [isMobile]);

  return (
    <>
      <Router>
        <div>
          <nav>
            <h1>Weather App</h1>
            <div className="nav-links">
              {isMobile ? (
                <Hamburger toggled={isOpen} toggle={setOpen} color="white" />
              ) : (
                <>
                  <Link to="/">Weather</Link>
                  <Link to="/favorites">Favorites</Link>
                </>
              )}
            </div>
          </nav>
          <MobileNav isOpen={isOpen} doClose={() => setOpen(false)} />
          <Routes>
            <Route path="/" element={<WeatherPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
          <Toaster position="bottom-center" />
        </div>
      </Router>
    </>
  );
};

export default App;
