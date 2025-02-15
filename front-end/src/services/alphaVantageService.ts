const ALPHA_VANTAGE_API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;

if (!ALPHA_VANTAGE_API_KEY) {
  console.warn(
    "Using demo API key - please set NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY in .env"
  );
}

const BASE_URL = "https://www.alphavantage.co/query";
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

export const searchStocks = async (query: string): Promise<StockSearchResult[]> => {
  try {
    const url = `${BASE_URL}?function=SYMBOL_SEARCH&keywords=${query}&apikey=${API_KEY}`;
    console.log('Searching stocks:', url);

    const response = await fetch(url);
    const data = await response.json();
    
    console.log('Search response:', data);

    if (data.Information?.includes('API call frequency')) {
      console.warn('API rate limit reached');
      return [
        {
          symbol: 'AAPL',
          name: 'Apple Inc',
          type: 'Equity',
          region: 'United States',
          currency: 'USD'
        },
        {
          symbol: 'MSFT',
          name: 'Microsoft Corporation',
          type: 'Equity',
          region: 'United States',
          currency: 'USD'
        },
        {
          symbol: 'GOOGL',
          name: 'Alphabet Inc',
          type: 'Equity',
          region: 'United States',
          currency: 'USD'
        }
      ].filter(stock => 
        stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
        stock.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (!data.bestMatches) {
      console.log('No matches found');
      return [];
    }

    return data.bestMatches.map((match: any) => ({
      symbol: match['1. symbol'],
      name: match['2. name'],
      type: match['3. type'],
      region: match['4. region'],
      currency: match['8. currency']
    }));
  } catch (error) {
    console.error('Error searching stocks:', error);
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
    const url = `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
    console.log("Fetching quote:", url);

    const response = await fetch(url);
    const data = await response.json();

    console.log("Quote response:", data);

    if (data.Information?.includes('API call frequency')) {
      console.warn('API rate limit reached, using mock data');
      const mockPrice = symbol === 'AAPL' ? 180 : symbol === 'MSFT' ? 400 : 140;
      return {
        price: mockPrice + Math.random() * 10 - 5,
        change: Math.random() * 4 - 2,
        changePercent: Math.random() * 2 - 1,
      };
    }

    const quote = data['Global Quote'];
    if (!quote) {
      console.log("No quote data found");
      return {
        price: 0,
        change: 0,
        changePercent: 0,
      };
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
    const url = `${BASE_URL}?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;
    console.log("Fetching historical data:", url);

    const response = await fetch(url);
    const data = await response.json();

    console.log("Historical response:", data);

    console.warn('Using mock data for historical prices');
    const mockData: TimeSeriesData[] = [];
    const basePrice = 
      symbol === 'AAPL' ? 180 : 
      symbol === 'MSFT' ? 400 : 
      symbol === 'GOOGL' ? 140 :
      symbol === 'IBM' ? 180 : 100;
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      mockData.push({
        x: date,
        y: basePrice + (Math.random() * 20 - 10) 
      });
    }

    console.log('Generated mock data:', mockData);
    return mockData;

    // Real API code (commented out for now)
    /*
    const timeSeriesData = data["Time Series (Daily)"];
    if (!timeSeriesData) {
      console.log("No historical data found");
      return [];
    }

    return Object.entries(timeSeriesData)
      .map(([date, values]: [string, any]) => ({
        x: new Date(date),
        y: parseFloat(values["4. close"] || 0),
      }))
      .reverse()
      .slice(0, 30);
    */
  } catch (error) {
    console.error("Error fetching historical data:", error);
    return [];
  }
};
