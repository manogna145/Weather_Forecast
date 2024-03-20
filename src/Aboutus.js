import React from 'react';
import './home.css';

const AboutPage = () => {
    return (
      <div className="about-page">
      <div className="about-container">
        <div className="inner-content">
        <h2 className="about-title">About Us</h2>
        <p>
        Our Weather Application is a web-based application that provides users with real-time weather forecasts and weather-related information.
  
  It utilizes a Weather API to fetch current weather data and forecasts for specified locations. 
  
  This application aims to help users plan their activities, stay informed about weather conditions, and make informed decisions based on weather predictions.
        </p>
        {/* Add more content as needed */}
      </div>
      </div>
      </div>
    );
  };
  
  export default AboutPage;