import React from "react";
import { CompanyOverview } from "@/services/alphaVantageService";

interface StockDetailsProps {
  details: CompanyOverview;
}

const StockDetails = ({ details }: StockDetailsProps) => {
  const detailsList: Record<string, string> = {
    Name: "Name",
    Country: "Country",
    Currency: "Currency",
    Exchange: "Exchange",
    Industry: "Industry",
    Sector: "Sector",
    MarketCapitalization: "Market Cap",
  };

  const convertMillionToBillion = (value: string) => {
    return (parseInt(value) / 1000).toFixed(2) + "B";
  };

  return (
    <ul className="w-full h-full flex flex-col justify-between divide-y-1">
      {Object.entries(detailsList).map(([key, label]) => (
        <li key={key} className="flex-1 flex justify-between items-center">
          <span>{label}</span>
          <span>
            {key === "MarketCapitalization" 
              ? convertMillionToBillion(details[key as keyof CompanyOverview] as string)
              : details[key as keyof CompanyOverview]}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default StockDetails;
