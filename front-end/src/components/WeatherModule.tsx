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
    "01": { icon: faSun, color: "text-yellow-400" , },
    "02": { icon: faCloudSun, color: "text-yellow-200" , },
    "03": { icon: faCloud, color: "text-gray-200",  },
    "04": { icon: faCloud, color: "text-gray-300" , },
    "09": { icon: faCloudShowersHeavy, color: "text-blue-400",  },
    "10": { icon: faCloudRain, color: "text-blue-500",  },
    "11": { icon: faBolt, color: "text-yellow-500" , },
    "13": { icon: faSnowflake, color: "text-blue-200", },
    "50": { icon: faSmog, color: "text-gray-400",  },
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

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <Module>
      <h1 className="text-2xl font-bold mr-10 text-primary">Weather</h1>
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
          <div className="search-bar flex items-center gap-2 mb-8">
            {weather && (
              <div className="current-weather flex p-4 items-center flex-col gap-2 mr-6 min-w-[140px]">
                  <h2 className="text-xl font-semibold text-primary">{weather.cityName}</h2>
                  <div className="flex flex-col items-center gap-3">
                    <FontAwesomeIcon
                      icon={getWeatherIcon(weather.weather[0].icon).icon}
                      className={`w-8 h-8 ${
                        getWeatherIcon(weather.weather[0].icon).color
                      }`}
                    />
                    <p className="text-lg">{weather.temp}°C</p>
                  </div>
                <p className="capitalize text-sm w-full text-center">{weather.weather[0].description}</p>
              </div>
            )}
            {forecast && (
              <div className="forecast flex flex-col gap-2">
                <ul className="flex gap-4 overflow-x-auto">
                  {forecast.map((day, index) => (
                    <li
                      key={index}
                      className="p-2 min-w-[140px] flex flex-col items-center gap-1 rounded-md bg-light-weather-gradient dark:bg-dark-weather-gradient"
                    >
                      <p className="font-medium mb-2">{getWeekday(index)}</p>
                      <div className="flex items-center flex-col gap-2">
                        <FontAwesomeIcon
                          icon={getWeatherIcon(day.weather[0].icon).icon}
                          className={`w-10 h-10 ${
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
      </div>
    </Module>
  );
};

export default WeatherModule;
