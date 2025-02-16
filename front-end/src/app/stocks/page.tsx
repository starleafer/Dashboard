"use client";
import React, { useState, useEffect } from "react";
import Stocks from "@/components/Stocks";
import CustomInput from "@/components/atoms/CustomInput";
import { mockStockQuote } from "@/mockData/mockStockData";
import { getLatestNews } from "@/services/newsService";
import { DialogTrigger } from "react-aria-components";
import NewsModal from "@/components/atoms/NewsModal";
import { Article as NewsArticle } from "@/types/newsTypes";

const StocksPage = () => {
  const [selectedStocks, setSelectedStocks] = useState<string[]>([
    "AAPL",
    "GOOGL",
    "MSFT",
  ]);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const fetchNews = async () => {
      const newsArticles = await getLatestNews("business");
      setArticles(newsArticles);
      setLoading(false);
    };

    fetchNews();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full max-w-[1600px] min-h-[600px] mt-4 mx-auto">
      <div className="w-full lg:w-2/3 bg-white dark:bg-dark-component rounded-md drop-shadow-xl">
        <Stocks defaultStock="AAPL" shadow={false} />
      </div>

      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        <div className="bg-white dark:bg-dark-component p-5 rounded-md drop-shadow-xl">
          <h2 className="text-xl font-bold text-primary mb-4">Watchlist</h2>
          <div className="flex flex-col gap-4">
            {selectedStocks.map((symbol) => (
              <StockCard key={symbol} symbol={symbol} />
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-dark-component p-5 rounded-md drop-shadow-xl">
          <h2 className="text-xl font-bold text-primary mb-4">Market News</h2>
          {articles[0] && (
            <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
              <button
                className="w-full text-left"
                onClick={() => setIsOpen(true)}
              >
                <div className="flex flex-col gap-4 relative rounded-md h-[200px]">
                  <img
                    src={articles[0].urlToImage}
                    alt={articles[0].title}
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300 rounded-md"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent rounded-lg" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h2 className="text-xl font-semibold mb-2">
                      {articles[0].title}
                    </h2>
                  </div>
                </div>
              </button>
              <NewsModal article={articles[0]} />
            </DialogTrigger>
          )}
        </div>
      </div>
    </div>
  );
};

const StockCard = ({ symbol }: { symbol: string }) => {
  const stockData = mockStockQuote[symbol] || mockStockQuote["AAPL"];
  const priceChange = parseFloat(stockData["09. change"]);
  const changePercent = parseFloat(
    stockData["10. change percent"].replace("%", "")
  );

  return (
    <div className="p-4 border border-primary rounded-md">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-primary">{symbol}</h3>
          <p className="text-sm text-shade">{stockData["01. symbol"]}</p>
        </div>
        <div className="text-right">
          <p className="font-bold">${stockData["05. price"]}</p>
          <p
            className={`text-sm ${
              priceChange >= 0 ? "text-completed" : "text-danger"
            }`}
          >
            {priceChange >= 0 ? "+" : ""}
            {priceChange.toFixed(2)} ({changePercent.toFixed(2)}%)
          </p>
        </div>
      </div>
    </div>
  );
};

export default StocksPage;
