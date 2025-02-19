import { useState, useEffect } from 'react';
import { getStockQuote } from '@/services/alphaVantageService';

interface StockQuoteData {
  price: number;
  change: number;
  changePercent: number;
}

export const useStockQuote = (symbol: string) => {
  const [quoteData, setQuoteData] = useState<StockQuoteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        setLoading(true);
        const data = await getStockQuote(symbol);
        setQuoteData(data);
      } catch (err) {
        setError('Failed to fetch stock quote');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
    const interval = setInterval(fetchQuote, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [symbol]);

  return { quoteData, loading, error };
}; 