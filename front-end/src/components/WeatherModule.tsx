"use client";
import React, { useState, useEffect } from "react";
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
import CustomSwitch from "./atoms/CustomSwitch";
import CustomToggleButton from "./atoms/CustomToggleButton";

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
  const [city, setCity] = useState("Stockholm");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (latitude?: number, longitude?: number) => {
    try {
      setLoading(true);
      setError("");

      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

      let lat = latitude;
      let lon = longitude;

      if (!lat || !lon) {
        const geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
        const geoResponse = await fetch(geoURL);
        const geoData = await geoResponse.json();

        if (geoData.length === 0) {
          setError("City not found");
          setLoading(false);
          return;
        }
        lat = geoData[0].lat;
        lon = geoData[0].lon;
      }

      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
      const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(weatherURL),
        fetch(forecastURL),
      ]);

      const weatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();

      setWeather({
        temp: Math.round(weatherData.main.temp),
        weather: weatherData.weather,
        cityName: city || weatherData.name,
      });

      const dailyForecasts = forecastData.list
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
        <div className="flex items-center justify-center gap-2 w-56">
          <Clock />
          <CustomToggleButton/>

          {/* <CustomSwitch /> */}
        </div>
      </div>
    </Module>
  );
};

export default WeatherModule;
