"use client";
import React, { useState, useRef, useEffect } from "react";
import CustomInput from "./atoms/CustomInput";
import { mockSearchResults, mockCompanyDetails, mockStockQuote } from "@/constants/mock";
import SearchResults from "./SearchResults";
import StockDetails from "./StockDetails";
import StockOverview from "./StockOverview";
import { StockSearchResult } from "@/services/alphaVantageService";
import StockChart from "./StockChart";

const Stocks = () => {
  const [inputValue, setInputValue] = useState("");
  const [bestMatches, setBestMatches] = useState<StockSearchResult[]>(
    mockSearchResults.bestMatches.map(match => ({
      symbol: match['1. symbol'],
      name: match['2. name'],
      type: match['3. type'],
      region: match['4. region'],
      currency: match['8. currency'],
    }))
  );
  const searchContainerRef = useRef<HTMLDivElement>(null);

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

  const updateBestMatches = (value: string) => {
    setInputValue(value);
    if (!value) {
      setBestMatches([]);
      return;
    }
    const filteredResults = mockSearchResults.bestMatches
      .map(match => ({
        symbol: match['1. symbol'],
        name: match['2. name'],
        type: match['3. type'],
        region: match['4. region'],
        currency: match['8. currency'],
      }))
      .filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.symbol.toLowerCase().includes(value.toLowerCase())
      );
    setBestMatches(filteredResults);
  };

  return (
    <div className="col-span-4 border m-5 rounded-3xl shadow-lg p-4">
      <div className="h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 gap-4">
        <div className="col-span-3 row-span-1 flex justify-start p-3">
          <h1 className="text-2xl font-bold mr-10">{mockCompanyDetails.Name}</h1>
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
              <SearchResults results={bestMatches} />
            ) : null}
          </div>
        </div>

        <div className="col-span-2 row-span-4 border p-4">
          <StockChart symbol={"IBM"} />
        </div>

        <div className="col-span-1 row-span-1 border p-4">
          <StockOverview
            symbol={mockCompanyDetails.Symbol}
            price={300}
            change={30}
            changePercent={10.0}
            currency={mockCompanyDetails.Currency}
          />
        </div>
        <div className="col-span-1 row-span-2 border p-4">
          <StockDetails details={mockCompanyDetails} />
        </div>
      </div>
    </div>
  );
};

export default Stocks;
