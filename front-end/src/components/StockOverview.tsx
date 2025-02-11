import React from "react";

interface StockOverviewProps {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  currency: string;
}

const StockOverview = ({
  symbol,
  price,
  change,
  changePercent,
  currency,
}: StockOverviewProps) => {
  return (
    <div className="w-full h-full flex flex-col justify-start">
      <span className="left-4 top-4 text-neutral-400 text-lg xl:text-xl 2xl:text-1xl">
        {symbol}
      </span>
      <div className="w-full h-full flex items-center justify-around">
        <span className="text-2xl xl:text-4xl 2xl:text-4xl flex items-center">
          ${price}
          <span className="text-lg xl:text-xl 2xl:text-2xl text-neutral-400 m-2">
            {currency}
          </span>
        </span>
        <span
          className={`text-lg xl:text-xl 2xl:text-2xl ${
            change > 0 ? "text-lime-500" : "text-red-500"
          }`}
        >
          {change} <span>({changePercent}%)</span>
        </span>
      </div>
    </div>
  );
};

export default StockOverview;
