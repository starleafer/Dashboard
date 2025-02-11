import React from "react";
import Module from "./Module";

interface StockDetailsProps {
  [key: string]: string | number; // Add index signature
  name: string;
  country: string;
  currency: string;
  exchange: string;
  ipo: string;
  marketCapitalization: number;
  finnhubIndustry: string;
}

const StockDetails = ({ details }: { details: StockDetailsProps }) => {
  const detailsList: Record<string, string> = {
    name: "Name",
    country: "Country",
    currency: "Currency",
    exchange: "Exchange",
    ipo: "IPO Date",
    marketCapitalization: "Market Cap",
    finnhubIndustry: "Industry",
  };

  const covertMillionToBillion = (value: number) => {
    return (value / 1000).toFixed(2) + "B";
  };

  return (
    <ul className="w-full h-full flex flex-col justify-between divide-y-1">
      {Object.entries(detailsList).map(([key, value]) => (
        <li key={key} className="flex-1 flex justify-between items-center">
          <span>{value}</span>
          <span>
            {key === "marketCapitalization"
              ? covertMillionToBillion(details[key])
              : details[key]}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default StockDetails;
