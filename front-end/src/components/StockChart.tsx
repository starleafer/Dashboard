import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { getStockQuote, getHistoricalData } from '@/services/alphaVantageService';
import Module from './Module';
import { ApexOptions } from 'apexcharts';

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [quote, history] = await Promise.all([
          getStockQuote(symbol),
          getHistoricalData(symbol)
        ]);
        setStockData(quote);
        setHistoricalData(history);
      } catch (error) {
        console.error('API Error:', error);
      }
    };
    fetchData();
  }, [symbol]);

  const chartOptions = {
    chart: {
      type: 'line',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    colors: ['#40a4ff'],
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          colors: '#718096'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#718096'
        },
        formatter: (value: number) => `$${value.toFixed(2)}`
      }
    },
    grid: {
      borderColor: '#e2e8f0',
      strokeDashArray: 4
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy'
      }
    }
  };

  const series = [{
    name: symbol,
    data: historicalData
  }];

  return (
    <Module>
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">{symbol} Stock Price</h2>
          {stockData && (
            <div className={`text-lg ${stockData.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              ${stockData.price.toFixed(2)} ({stockData.changePercent.toFixed(2)}%)
            </div>
          )}
        </div>
        <ReactApexChart
          options={chartOptions as ApexOptions}
          series={series}
          type="line"
          height={350}
        />
      </div>
    </Module>
  );
};

export default StockChart;