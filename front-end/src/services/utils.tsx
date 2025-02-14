interface StockValue {
  '1. open': string;
  '2. high': string;
  '3. low': string;
  '4. close': string;
  '5. adjusted close': string;
  '6. volume': string;
  '7. dividend amount': string;
}

export const formatStockData = (stockData: any) => {
    const formatedData: { x: string; y: string[] }[] = []
    if (stockData['Weekly Adjusted Time Series']) {
        Object.entries(
            stockData['Weekly Adjusted Time Series']
        ).forEach(
            ([key, value]) => {
                const stockValue = value as StockValue;
                formatedData.push({
                    x: key,
                    y: [
                        stockValue['1. open'],
                        stockValue['2. high'],
                        stockValue['3. low'],
                        stockValue['4. close'],
                        stockValue['5. adjusted close'],
                        stockValue['6. volume'],
                        stockValue['7. dividend amount'],
                    ]
                })
            }
        )
    }
    return formatedData
}

