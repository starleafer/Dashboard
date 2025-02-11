declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_WEATHER_API_KEY: string;
      NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY: string;
    }
  }
}

export {}; 