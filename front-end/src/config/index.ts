const weatherApiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
console.log('Config loading, API key:', weatherApiKey);

export const config = {
  weatherApiKey,
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'
} as const; 