export const config = {
  weatherApiKey: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'
} as const; 