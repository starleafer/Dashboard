"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Module from "./Module";
import CustomInput from "./atoms/CustomInput";
import CustomButton from "./atoms/CustomButton";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (latitude?: number, longitude?: number) => {
    try {
      setLoading(true);
      setError("");

      let lat = latitude;
      let lon = longitude;

      // If latitude and longitude are not provided, get the coordinates of the entered city
      if (!lat || !lon) {
        const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`;
        const geoResponse = await axios.get(geoURL);
        if (geoResponse.data.length === 0) {
          setError("City not found");
          setLoading(false);
          return;
        }
        lat = geoResponse.data[0].lat;
        lon = geoResponse.data[0].lon;
      }

      // Fetch weather and 7-day forecast data
      const weatherURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`;
      const weatherResponse = await axios.get(weatherURL);
      setWeather(weatherResponse.data.current);
      setForecast(weatherResponse.data.daily);

    } catch (err) {
      console.error(err);
      setError("Error fetching weather data");
    } finally {
      setLoading(false);
      setCity(""); // Clear the search field
    }
  };

  // Fetch weather for the current location
  const fetchCurrentLocationWeather = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      (err) => {
        console.error(err);
        setError("Could not get location");
      }
    );
  };

  useEffect(() => {
    // Automatically fetch weather for current location on load
    fetchCurrentLocationWeather();
  }, []);

  return (
    <Module>
      <div className="weather-container">
        <div className="search-bar">
          <CustomInput
            value={city}
            onChange={(value: string) => setCity(value)}
            placeholder="Enter city"
          />
          <CustomButton onClick={() => fetchWeather()} disabled={loading}>
            {loading ? "Loading..." : "Search"}
          </CustomButton>
        </div>
        {error && <p className="error">{error}</p>}
        {weather && (
          <div className="current-weather">
            <h2>Current Weather</h2>
            <p>Temperature: {weather.temp}°C</p>
            <p>Condition: {weather.weather[0].description}</p>
          </div>
        )}
        {forecast && (
          <div className="forecast">
            <h2>7-Day Forecast</h2>
            <ul>
              {forecast.map((day, index) => (
                <li key={index}>
                  <p>Day {index + 1}</p>
                  <p>Temp: {day.temp.day}°C</p>
                  <p>Condition: {day.weather[0].description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Module>
  );
};

export default Weather;
