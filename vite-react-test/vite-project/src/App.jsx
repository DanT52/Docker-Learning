import { useState } from 'react';
import './index.css';

function App() {
  const [difficulty, setDifficulty] = useState(50);
  const [routeInfo, setRouteInfo] = useState(null);

  const handleGoClick = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${window.location.protocol}//${window.location.hostname}:8000/route?difficulty=${difficulty}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setRouteInfo(data);
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

  return (
    <>
      <header>
        <div className="container">
          <h1 className="title">Skate Route Planner</h1>
        </div>
      </header>

      <main>
        <div className="card">
          <h2 className="card-title">Plan Your Skate Adventure</h2>
          <button className="button">
            <i className="fas fa-map-marker-alt"></i>
            Today's Route
          </button>
          
          <div className="slider-container">
            <label className="slider-label" htmlFor="difficulty-slider">Difficulty: {difficulty}%</label>
            <input
              id="difficulty-slider"
              type="range"
              min="0"
              max="100"
              value={difficulty}
              className="slider"
              onChange={(e) => setDifficulty(e.target.value)}
            />
          </div>

          <button className="button primary" onClick={handleGoClick}>
            <i className="fas fa-arrow-right"></i>
            Go
          </button>
        </div>

        <div className={`card route-info ${!routeInfo ? 'hidden' : ''}`}>
          <h2 className="card-title">Your Skate Route</h2>
          
          {routeInfo && (
            <>
              <div className="info-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>Distance: {routeInfo.distance} miles</span>
              </div>
              
              <div className="info-item">
                <i className="fas fa-road"></i>
                <span>Terrain: {routeInfo.terrain}</span>
              </div>
              
              <div className="info-item">
                <i className="fas fa-mountain"></i>
                <span>Elevation Gain: {routeInfo.elevation_gain} ft</span>
              </div>
              
              <div className="info-item">
                <i className="fas fa-bolt"></i>
                <span>Max Potential Speed: {routeInfo.max_speed} mph</span>
              </div>
              
              <div className="info-item">
                <i className="fas fa-car"></i>
                <span>Traffic: {routeInfo.traffic}</span>
              </div>
            </>
          )}
        </div>
      </main>

      <footer>
        <div className="container">
          © 2024 Skate Route Planner. Roll safely!
        </div>
      </footer>
    </>
  );
}

export default App;
