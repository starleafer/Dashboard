const ALPHA_VANTAGE_API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;

if (!ALPHA_VANTAGE_API_KEY) {
  console.warn(
    "Using demo API key - please set NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY in .env"
  );
}

const BASE_URL = "https://www.alphavantage.co";
const API_KEY = ALPHA_VANTAGE_API_KEY;

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

export const searchSymbols = async (query: string): Promise<StockSearchResult[]> => {
  try {
    const url = `${BASE_URL}/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${API_KEY}`;
    console.log("Searching symbols with URL:", url);

    const response = await fetch(url);
    const data = await response.json();
    
    console.log("Search API response:", data);

    if (data.Note || data.Information?.includes('API call frequency')) {
      console.warn('API rate limit reached');
      return [];
    }

    if (data.bestMatches) {
      return data.bestMatches.map((match: any) => ({
        symbol: match["1. symbol"],
        name: match["2. name"],
        type: match["3. type"],
        region: match["4. region"],
        currency: match["8. currency"],
      }));
    }
    
    return [];
  } catch (error) {
    console.error("Error searching symbols:", error);
    return [];
  }
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
    const url = `${BASE_URL}/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
    console.log("Fetching quote for:", symbol);

    const response = await fetch(url);
    const data = await response.json();

    console.log("Quote response for", symbol, ":", data);

    if (data.Note || data.Information?.includes('API call frequency')) {
      console.warn('API rate limit reached, using mock data for', symbol);
      return {
        price: symbol === 'AAPL' ? 180 : symbol === 'MSFT' ? 400 : 140,
        change: Math.random() * 4 - 2,
        changePercent: Math.random() * 2 - 1,
      };
    }

    const quote = data['Global Quote'];
    if (!quote) {
      throw new Error('No quote data found');
    }

    return {
      price: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
    };
  } catch (error) {
    console.error("Error fetching stock quote:", error);
    return {
      price: 0,
      change: 0,
      changePercent: 0,
    };
  }
};

export const getHistoricalData = async (symbol: string): Promise<TimeSeriesData[]> => {
  try {
    // Generate mock historical data
    const mockData: TimeSeriesData[] = [];
    const basePrice = 
      symbol === 'AAPL' ? 180 : 
      symbol === 'MSFT' ? 400 : 
      symbol === 'GOOGL' ? 140 : 100;

    // Generate 30 days of mock data
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      mockData.push({
        x: date,
        y: basePrice + (Math.random() * 20 - 10) // Random price variation
      });
    }

    return mockData;
  } catch (error) {
    console.error("Error generating mock data:", error);
    return [];
  }
};

export const searchStocks = async (query: string): Promise<StockSearchResult[]> => {
  try {
    const url = `${BASE_URL}/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${API_KEY}`;
    console.log("Full URL:", url);

    const response = await fetch(url);
    const data = await response.json();
    console.log("Raw API response:", data);

    if (data.bestMatches) {
      return data.bestMatches.map((match: any) => ({
        symbol: match["1. symbol"],
        name: match["2. name"],
        type: match["3. type"],
        region: match["4. region"],
        currency: match["8. currency"],
      }));
    }
    return [];
  } catch (error) {
    console.error("Search error details:", error);
    return [];
  }
};
