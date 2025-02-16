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

export const weatherIcons = {
  "01": { icon: faSun, color: "text-yellow-400" },
  "02": { icon: faCloudSun, color: "text-yellow-200" },
  "03": { icon: faCloud, color: "text-gray-200" },
  "04": { icon: faCloud, color: "text-gray-300" },
  "09": { icon: faCloudShowersHeavy, color: "text-blue-400" },
  "10": { icon: faCloudRain, color: "text-blue-500" },
  "11": { icon: faBolt, color: "text-yellow-500" },
  "13": { icon: faSnowflake, color: "text-blue-200" },
  "50": { icon: faSmog, color: "text-gray-400" },
} as const;

export const getWeatherIcon = (iconCode: string) => {
  const code = iconCode.slice(0, 2) as keyof typeof weatherIcons;
  return weatherIcons[code] || { icon: faSun, color: "text-yellow-400" };
};
