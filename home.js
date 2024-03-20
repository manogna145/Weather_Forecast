import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router,Routes,Route, Link } from 'react-router-dom';
import './home.css'
import moment from 'moment';
import video from './videos/sunny.mp4'; // Import the video file




const Navbar = ({ username, onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <nav className="navbar">
      <div className="content">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <span>Welcome, {username}!</span>
          </li>
          <li className="logout-button">
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const BottomNavbar = () => {
  return (
    <nav className="bottom-navbar">
      <div className="content">
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const CurrentWeatherBox = ({ cityName, onSearch }) => {
    const [searchCity, setSearchCity] = useState(cityName || '');
    const [error, setError] = useState('');
  
    
  
    const handleSearch = () => {
      const trimmedCity = searchCity.trim();
    
      if (trimmedCity !== '' && /\S/.test(trimmedCity)) {
        onSearch(trimmedCity);
      } else {
        // Clear the state values to empty
        setSearchCity('');
        // Optionally, reset other state values to empty
         //resetOtherStateValues();
      }
    };
    
    
  
    return (
      <div className="current-weather-box">
        <h2>Current Weather</h2>
        {error && <p className="error-message">{error}</p>}
        <div>
          <label htmlFor="searchCity">City Name:</label>
          <input
            type="text"
            id="searchCity"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
          />
        </div>
        <button onClick={handleSearch}>Search</button>
      </div>
    );
  };
  
  const ForecastCard = ({ data }) => {
    const date = new Date(data.dt * 1000);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = days[date.getDay()];
  
    return (
      <div className="weather-card" >
        <h4>{day}</h4>
        <p>Date: {date.toLocaleDateString()}</p>
        <p>Temperature: {data.main.temp}°C</p>
        <p>Weather: {data.weather[0].description}</p>
      </div>
    );
  };
  
  const SevenDayForecast = ({ cityName }) => {
    console.log(cityName);
    const [forecastData, setForecastData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetch7DayForecast = async () => {
        try {
          const todayDate = moment().format('YYYY-MM-DD');
  
          if (cityName.trim() === '') {
            setForecastData([]);
            setLoading(false);
            setError('Please enter a valid city name.');
            return;
          }
  
          const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=4b4ddeea4278d6e5094f2d6cf5add014&units=metric`);
  
          if (!response.ok) {
            console.error("Failed to fetch weather data from OpenWeatherMap.");
            setError('Failed to fetch weather data.');
            setForecastData([]); // Ensure to clear forecastData on error
            return;
          }
  
          const weatherData = await response.json();
  
          const filteredData = {};
          weatherData.list.forEach(item => {
            const date = item.dt_txt.split(' ')[0];
            if (date === todayDate && !filteredData[date]) {
              filteredData[date] = item;
            }
          });
  
          const todayData = Object.values(filteredData);
  
          setForecastData(todayData);
          setError(null); // Clear error when data is successfully fetched
        } catch (error) {
          console.error("Error fetching weather data:", error);
          setError('Error fetching weather data.');
        } finally {
          setLoading(false);
        }
      };
  
      fetch7DayForecast();
    }, [cityName]);
  
    return (
      <div className="seven-day-forecast">
        <h2>Weather Forecast for {cityName}</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        {!error && forecastData.length > 0 && (
          <div className="weather-cards">
            {forecastData.map((dailyData) => (
              <ForecastCard key={dailyData.dt} data={dailyData} />
            ))}
          </div>
        )}
      </div>
    );
  };
  
  
  const Home = () => {
    const [cityName, setCityName] = useState('');
  
    return (
      <div className="home-page" style={{ position: 'relative' }}>
        <Navbar></Navbar>
        
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
          }}
        >
          <source src={video} type="video/mp4" />
        </video>
  
        <div className="content">
          <div className="weather-container">
            <h1>Welcome to the Weather App!</h1>
            <CurrentWeatherBox cityName={cityName} onSearch={setCityName} />
            <SevenDayForecast cityName={cityName} />
          </div>
        </div>
        <BottomNavbar></BottomNavbar>
      </div>
    );
  };

  
  
  export default Home;
  
