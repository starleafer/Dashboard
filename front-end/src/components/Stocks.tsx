"use client";
import React, { useState, useRef, useEffect } from "react";
import CustomInput from "./atoms/CustomInput";
import {
  mockSearchResults,
  mockCompanyDetails,
  mockStockQuote,
} from "@/constants/mock";
import SearchResults from "./SearchResults";
import StockDetails from "./StockDetails";
import StockOverview from "./StockOverview";
import {
  StockSearchResult,
  searchStocks,
} from "@/services/alphaVantageService";
import StockChart from "./StockChart";

const Stocks = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedStock, setSelectedStock] = useState("IBM");
  const [bestMatches, setBestMatches] = useState<StockSearchResult[]>([]);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [stockData, setStockData] = useState(mockStockQuote);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setBestMatches([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const clear = () => {
    setInputValue("");
    setBestMatches([]);
  };

  const updateBestMatches = async (value: string) => {
    setInputValue(value);
    if (!value || value.length < 2) {
      setBestMatches([]);
      return;
    }
    try {
      const results = await searchStocks(value);
      console.log("Search results received:", results);
      if (results && Array.isArray(results) && results.length > 0) {
        console.log("Setting best matches:", results);
        setBestMatches(results);
      } else {
        console.log("No results found");
        setBestMatches([]);
      }
    } catch (error) {
      console.error("Error searching:", error);
      setBestMatches([]);
    }
  };

  const handleStockSelect = (stock: StockSearchResult) => {
    console.log("Selected stock:", stock);
    setSelectedStock(stock.symbol);
    setInputValue("");
    setBestMatches([]);
  };

  return (
    <div className="col-span-4 border m-5 py-5 -3xl">
      <div className="col-span-3 ml-3 row-span-1 mb-3 flex justify-start p-3">
        <h1 className="text-2xl font-bold mr-10">{selectedStock}</h1>
        <div className="relative w-full md:max-w-xs" ref={searchContainerRef}>
          <CustomInput
            value={inputValue}
            onChange={setInputValue}
            placeholder="Search stock..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                clear();
              }
            }}
            onClear={clear}
            onSearch={updateBestMatches}
          />
          {inputValue && bestMatches.length > 0 ? (
            <SearchResults results={bestMatches} onSelect={handleStockSelect} />
          ) : null}
        </div>
      </div>
      <div className=" grid grid-cols-1 pt-5 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-2 gap-4 border-t border-gray-200 dark:border-gray-700">
        <div className="col-span-2 row-span-3">
          <StockChart symbol={selectedStock} />
        </div>

        {/* <div className="col-span-1 row-span-1 border p-4">
          <StockOverview
            symbol={selectedStock}
            price={stockData?.price || 0}
            change={stockData?.change || 0}
            changePercent={stockData?.changePercent || 0}
            currency="USD"
          />
        </div> */}
        <div className="col-span-1 row-span-3  p-4 ">
          <StockDetails
            details={{
              Symbol: selectedStock,
              Name: selectedStock,
              Description: "",
              Currency: "USD",
              Country: "US",
              Sector: "",
              Industry: "",
              MarketCapitalization: "0",
              Exchange: "NASDAQ",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Stocks;
