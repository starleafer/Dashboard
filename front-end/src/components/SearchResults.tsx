import React from "react";
import { StockSearchResult } from "@/services/alphaVantageService";

interface SearchResultsProps {
  results: StockSearchResult[];
  onSelect: (stock: StockSearchResult) => void;
}

const SearchResults = ({ results, onSelect }: SearchResultsProps) => {
  console.log('Rendering search results:', results);
  return (
    <ul className="absolute top-full mt-1 border-2 overflow-y-scroll w-full z-10 bg-dark custom-scrollbar">
      {results.map((item) => (
        <li
          key={item.symbol}
          className="p-2 hover:bg-primary cursor-pointer flex items-center justify-between bg-dark"
          onClick={() => {
            console.log('Clicked item:', item);
            onSelect(item);
          }}
        >
          <span>{item.symbol}</span>
          <span>{item.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
