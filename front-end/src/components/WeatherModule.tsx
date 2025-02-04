"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Module from "./Module";
import CustomInput from "./atoms/CustomInput";
import CustomButton from "./atoms/CustomButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faCloud,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faBolt,
  faSmog,
  faCloudSun,
} from "@fortawesome/free-solid-svg-icons";
import Clock from "./Clock";

interface WeatherData {
  temp: number;
  weather: Array<{
    description: string;
    icon: string;
  }>;
  cityName: string;
}

interface ForecastDay {
  temp: {
    day: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}

const getWeekday = (index: number): string => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const today = new Date();
  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + index);
  return days[nextDay.getDay()];
};

const getWeatherIcon = (iconCode: string) => {
  const iconMap = {
    "01": { icon: faSun, color: "text-yellow-400" },
    "02": { icon: faCloudSun, color: "text-yellow-200" },
    "03": { icon: faCloud, color: "text-gray-200" },
    "04": { icon: faCloud, color: "text-gray-300" },
    "09": { icon: faCloudShowersHeavy, color: "text-blue-400" },
    "10": { icon: faCloudRain, color: "text-blue-500" },
    "11": { icon: faBolt, color: "text-yellow-500" },
    "13": { icon: faSnowflake, color: "text-blue-200" },
    "50": { icon: faSmog, color: "text-gray-400" },
  };

  const code = iconCode.slice(0, 2) as keyof typeof iconMap;
  return iconMap[code] || { icon: faSun, color: "text-yellow-400" };
};

const WeatherModule = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "f6fad2157a3989de7faf7a3c1dd3ce75";

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
        axios.get(forecastURL),
      ]);

      setWeather({
        temp: Math.round(weatherResponse.data.main.temp),
        weather: weatherResponse.data.weather,
        cityName: city || weatherResponse.data.name,
      });

      const dailyForecasts = forecastResponse.data.list
        .filter((_: any, index: number) => index % 8 === 0)
        .map((item: any) => ({
          temp: {
            day: Math.round(item.main.temp),
          },
          weather: item.weather,
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

  return (
    <Module>
      <div className="weather-container h-24 flex items-center justify-between gap-4 ">
        <div className="search-bar flex items-center gap-2">
          <div className="flex gap-2 mr-5">
            <CustomInput
              value={city}
              onChange={(value: string) => setCity(value)}
              placeholder={city ? city : "Enter city"}
            />
            <CustomButton
              onPress={() => fetchWeather()}
              variant="secondary"
              label={loading ? "Loading..." : "Search"}
            />
          </div>
          <div className="search-bar flex items-center gap-2 ">
            {weather && (
              <div className="current-weather flex rounded-md p-4 items-center flex-col gap-1 mr-6">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-semibold">{weather.cityName}</h2>
                  <div className="flex items-center gap-3">
                    <p className="text-lg">{weather.temp}°C</p>
                    <FontAwesomeIcon
                      icon={getWeatherIcon(weather.weather[0].icon).icon}
                      className={`w-8 h-8 ${
                        getWeatherIcon(weather.weather[0].icon).color
                      }`}
                    />
                  </div>
                </div>
                <p className="capitalize">{weather.weather[0].description}</p>
              </div>
            )}
            {forecast && (
              <div className="forecast rounded-md flex flex-col gap-2">
                {/* <h2 className="text-xl font-semibold">5-Day Forecast</h2> */}
                <ul className="flex gap-4 overflow-x-auto">
                  {forecast.map((day, index) => (
                    <li
                      key={index}
                      className="border rounded-xl p-3 mt-2 mb-2 min-w-[140px] flex flex-col items-center gap-1 bg-white/5"
                    >
                      <p className="font-medium mb-2">{getWeekday(index)}</p>
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon
                          icon={getWeatherIcon(day.weather[0].icon).icon}
                          className={`w-6 h-6 ${
                            getWeatherIcon(day.weather[0].icon).color
                          }`}
                        />
                        <p className="text-lg">{day.temp.day}°C</p>
                      </div>
                      <p className="text-sm capitalize text-gray-500">
                        {day.weather[0].description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <Clock />
      </div>
      {/* {!weather && !error && (
        <p className="initial-message text-gray-500 text-center italic">
          Search for a city or use your current location to get weather
          information
        </p>
      )}
      {error && <p className="error text-red-500 text-center">{error}</p>} */}
    </Module>
  );
};

export default WeatherModule;
