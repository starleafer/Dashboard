"use client";
import React, { useState, useRef, useEffect } from "react";
import CustomInput from "./atoms/CustomInput";
import { mockSearchResults } from "@/constants/mock";
import { mockCompanyDetails } from "@/constants/mock";
import SearchResults from "./SearchResults";
import StockDetails from "./StockDetails";

const Stocks = () => {
  const [inputValue, setInputValue] = useState("");
  const [bestMatches, setBestMatches] = useState(mockSearchResults.result);
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
    const filteredResults = mockSearchResults.result.filter(
      (item) =>
        item.description.toLowerCase().includes(value.toLowerCase()) ||
        item.symbol.toLowerCase().includes(value.toLowerCase())
    );
    setBestMatches(filteredResults);
  };

  return (
    <div className="col-span-4 border m-5 rounded-3xl shadow-lg p-4">
      <div className="h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 gap-4">
        {/* Header */}

        <div className="col-span-3 row-span-1 flex flex-col justify-center items-start">
          <h1 className="text-2xl font-bold mb-7">{mockCompanyDetails.name}</h1>
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

        {/* Chart */}
        <div className="col-span-2 row-span-4 border p-4">Chart</div>

        {/* Overview */}
        <div className="col-span-1 row-span-2 border p-4">
          <h4>Overview</h4>
        </div>
        <div className="col-span-1 row-span-2 border p-4">
          <StockDetails details={mockCompanyDetails} />
        </div>
      </div>
    </div>
  );
};

export default Stocks;
