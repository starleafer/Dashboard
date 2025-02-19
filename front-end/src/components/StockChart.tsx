import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useTheme } from '@/context/ThemeContext';

interface TimeSeriesData {
  x: Date;
  y: number;
}

const mockStockData = {
  'AAPL': { basePrice: 180 },
  'MSFT': { basePrice: 400 },
  'GOOGL': { basePrice: 140 }
};

const StockChart = ({ symbol }: { symbol: string }) => {
  const [data, setData] = useState<TimeSeriesData[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const generateMockData = () => {
      const basePrice = mockStockData[symbol as keyof typeof mockStockData]?.basePrice || 100;
      const mockData: TimeSeriesData[] = [];

      for (let i = 29; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        mockData.push({
          x: date,
          y: basePrice + (Math.random() * 20 - 10)
        });
      }

      setData(mockData);
      setLoading(false);
    };

    generateMockData();
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

  if (!data.length) {
    return (
      <div className="h-[350px] flex items-center justify-center">
        No data available
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold text-shade dark:text-dark-text">
          {symbol} Stock Price
        </h2>
      </div>
      <ReactApexChart
        options={chartOptions}
        series={[
          {
            name: symbol,
            data: data,
          },
        ]}
        type="line"
        height={300}
      />
    </div>
  );
};

export default StockChart;
