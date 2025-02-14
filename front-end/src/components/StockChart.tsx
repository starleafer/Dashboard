import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import {
  getStockQuote,
  getHistoricalData,
} from "@/services/alphaVantageService";
import { ApexOptions } from "apexcharts";
import { useTheme } from '@/context/ThemeContext';
interface StockData {
  price: number;
  change: number;
  changePercent: number;
}

interface TimeSeriesData {
  x: Date;
  y: number;
}

const StockChart = ({ symbol }: { symbol: string }) => {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [historicalData, setHistoricalData] = useState<TimeSeriesData[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log("Fetching data for symbol:", symbol);
        const [quote, history] = await Promise.all([
          getStockQuote(symbol),
          getHistoricalData(symbol),
        ]);
        console.log("Received quote:", quote);
        console.log("Received history:", history);

        setStockData(quote);
        if (history && history.length > 0) {
          setHistoricalData(history);
        } else {
          console.error("No historical data received");
        }
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [symbol]);

  const chartOptions: ApexOptions = {
    chart: {
      type: "line" as const,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#40a4ff"],
    xaxis: {
      type: "datetime",
      labels: {
        style: {
          colors: "#718096",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#718096",
        },
        formatter: (value: number) => `$${value.toFixed(2)}`,
      },
    },
    grid: {
      borderColor: "#e2e8f0",
      strokeDashArray: 4,
    },
    tooltip: {
      theme: theme === 'dark' ? 'light' : 'dark',
      style: {
        fontSize: "12px",
        fontFamily: "inherit",
      },
      x: {
        format: "dd MMM yyyy",
      },
      cssClass: theme === 'dark' ? 'dark-tooltip' : 'light-tooltip',

    },
  };

  if (loading) {
    return (
      <div className="h-[350px] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!historicalData.length) {
    return (
      <div className="h-[350px] flex items-center justify-center">
        No data available
      </div>
    );
  }

  return (
    <div className="p-4 ">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold text-shade dark:text-dark-text">
          {symbol} Stock Price
        </h2>
        {stockData && (
          <div
            className={`text-lg ${
              stockData.change >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            ${stockData.price.toFixed(2)} ({stockData.changePercent.toFixed(2)}
            %)
          </div>
        )}
      </div>
      <ReactApexChart
        options={chartOptions}
        series={[
          {
            name: symbol,
            data: historicalData,
          },
        ]}
        type="line"
        height={300}
      />
    </div>
  );
};

export default StockChart;
