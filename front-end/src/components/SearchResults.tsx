import React from "react";

const SearchResults = ({ results }: { results: any[] }) => {
  return (
    <ul className="absolute top-full mt-1 border-2 rounded-md overflow-y-scroll w-full z-10 bg-dark custom-scrollbar">
      {results.map((item) => (
        <li
          key={item.symbol}
          className="p-2 hover:bg-primary cursor-pointer flex items-center justify-between rounded-md bg-dark"
        >
          <span>{item.symbol}</span>
          <span>{item.description}</span>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
