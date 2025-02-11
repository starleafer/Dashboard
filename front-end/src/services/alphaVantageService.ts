const ALPHA_VANTAGE_API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;

if (!ALPHA_VANTAGE_API_KEY) {
  console.warn('Using demo API key - please set NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY in .env');
}

const BASE_URL = "https://www.alphavantage.co/query";
const API_KEY = ALPHA_VANTAGE_API_KEY || 'demo'; 

export interface StockSearchResult {
  symbol: string;
  name: string;
  type: string;
  region: string;
  currency: string;
}

export interface CompanyOverview {
  Symbol: string;
  Name: string;
  Description: string;
  Currency: string;
  Country: string;
  Sector: string;
  Industry: string;
  MarketCapitalization: string;
  Exchange: string;
}

export interface TimeSeriesData {
  x: Date;
  y: number;
}

export const searchStocks = async (
  symbol: string
): Promise<StockSearchResult[]> => {
  const response = await fetch(
    `${BASE_URL}?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${symbol}&apikey=${API_KEY}`
  );
  const data = await response.json();
  console.log(data);
  return data;
};

export const getCompanyOverview = async (
  symbol: string
): Promise<CompanyOverview> => {
  const response = await fetch(
    `${BASE_URL}?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`
  );
  return response.json();
};

export const getStockQuote = async (symbol: string) => {
  try {
    // Use demo endpoint for testing
    const url = `${BASE_URL}?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo`;
    console.log('Fetching quote:', url);
    
    const response = await fetch(url);
    const data = await response.json();
    
    console.log('Quote response:', data);

    const timeSeries = data["Time Series (5min)"];
    if (!timeSeries) {
      console.log('No quote data found');
      return {
        price: 0,
        change: 0,
        changePercent: 0
      };
    }
    
    const latestTime = Object.keys(timeSeries)[0];
    const latestData = timeSeries[latestTime];
    
    return {
      price: parseFloat(latestData["4. close"] || 0),
      change: 0, 
      changePercent: 0
    };
  } catch (error) {
    console.error('Error fetching stock quote:', error);
    return {
      price: 0,
      change: 0,
      changePercent: 0
    };
  }
};

export const getHistoricalData = async (symbol: string): Promise<TimeSeriesData[]> => {
  try {
    const url = `${BASE_URL}?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo`;
    console.log('Fetching historical data:', url);
    
    const response = await fetch(url);
    const data = await response.json();
    
    console.log('Historical response:', data);

    const timeSeriesData = data["Time Series (Daily)"];
    if (!timeSeriesData) {
      console.log('No historical data found');
      return [];
    }

    return Object.entries(timeSeriesData)
      .map(([date, values]: [string, any]) => ({
        x: new Date(date),
        y: parseFloat(values["4. close"] || 0)
      }))
      .reverse()
      .slice(0, 30); 
  } catch (error) {
    console.error('Error fetching historical data:', error);
    return [];
  }
};
