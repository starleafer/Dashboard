"use client";
import React, { useState } from "react";
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

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ... rest of your component code ...
};

export default Weather; 