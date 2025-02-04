"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Module from "./Module";
import CustomInput from "./atoms/CustomInput";
import CustomButton from "./atoms/CustomButton";

interface WeatherData {
  temp: number;
  weather: Array<{
    description: string;
  }>;
}

interface ForecastDay {
  temp: {
    day: number;
  };
  weather: Array<{
    description: string;
  }>;
}

const WeatherModule = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = 'f6fad2157a3989de7faf7a3c1dd3ce75'; 
  
  const fetchWeather = async (latitude?: number, longitude?: number) => {
    try {
      setLoading(true);
      setError("");

      let lat = latitude;
      let lon = longitude;

      if (!lat || !lon) {
        const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
        const geoResponse = await axios.get(geoURL);
        if (geoResponse.data.length === 0) {
          setError("City not found");
          setLoading(false);
          return;
        }
        lat = geoResponse.data[0].lat;
        lon = geoResponse.data[0].lon;
      }

      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
      const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
      
      const [weatherResponse, forecastResponse] = await Promise.all([
        axios.get(weatherURL),
        axios.get(forecastURL)
      ]);

      setWeather({
        temp: weatherResponse.data.main.temp,
        weather: weatherResponse.data.weather
      });

      const dailyForecasts = forecastResponse.data.list
        .filter((_: any, index: number) => index % 8 === 0) 
        .map((item: any) => ({
          temp: {
            day: item.main.temp
          },
          weather: item.weather
        }));

      setForecast(dailyForecasts);
    } catch (err) {
      console.error(err);
      setError("Error fetching weather data");
    } finally {
      setLoading(false);
      setCity(""); 
    }
  };



  const fetchCurrentLocationWeather = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      (error: GeolocationPositionError) => {
        let errorMessage = "Could not get location";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location access denied. Please enable location services.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }

        setError(errorMessage);
      }
    );
  };

  return (
    <Module>
      <div className="weather-container">
        <div className="search-bar">
          <CustomInput
            value={city}
            onChange={(value: string) => setCity(value)}
            placeholder="Enter city"
          />
          <CustomButton 
            onPress={() => fetchWeather()} 
            variant="primary"
            label={loading ? "Loading..." : "Search"}
          />
          <CustomButton
            onPress={fetchCurrentLocationWeather}
            variant="secondary"
            label="Use Current Location"
          />
        </div>
        {!weather && !error && (
          <p className="initial-message">
            Search for a city or use your current location to get weather information
          </p>
        )}
        {error && <p className="error">{error}</p>}
        {weather && (
          <div className="current-weather">
            <h2>Current Weather</h2>
            <p>Temperature: {weather.temp}°C</p>
            <p>Condition: {weather.weather[0].description}</p>
          </div>
        )}
        {forecast && (
          <div className="forecast border-2 border-primary rounded-md p-4 flex flex-col gap-2">
            <h2>7-Day Forecast</h2>
            <ul className="flex gap-2">
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

export default WeatherModule;
