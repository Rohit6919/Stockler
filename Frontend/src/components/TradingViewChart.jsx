import React from "react";

const TradingViewChart = ({ stockSymbol, exchange = "NASDAQ" }) => {
  // Prepend the exchange to the stock symbol dynamically
  const fullSymbol = `${exchange}:${stockSymbol}`;

  return (
    <div className="mt-2 max-w-5xl mx-auto px-4"> {/* Added px-8 for left-right padding */}
      <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">{stockSymbol} Stock Chart</h3>
      <iframe
        src={`https://s.tradingview.com/widgetembed/?symbol=${fullSymbol}&theme=dark&style=1&interval=D`}
        width="100%" 
        height="450"
        frameBorder="0"
        title="Stock Chart"
        className="rounded-lg shadow-lg"
      ></iframe>
    </div>
  );
};

export default TradingViewChart;
