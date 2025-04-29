import React, { useState } from "react";

const API_KEY = "NW1HMZ4I01ZLV6UD";
const BASE_URL = "https://www.alphavantage.co/query";

function StockSearch() {
  const [stockSymbol, setStockSymbol] = useState("");
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!stockSymbol.trim()) return;

    setLoading(true);
    setError(null);
    setSuccessMsg("");

    try {
      const response = await fetch(
        `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${stockSymbol.toUpperCase()}&apikey=${API_KEY}`
      );
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      const stockInfo = data["Global Quote"];
      if (!stockInfo || Object.keys(stockInfo).length === 0) {
        throw new Error("Stock not found");
      }

      setStockData({
        symbol: stockInfo["01. symbol"],
        price: stockInfo["05. price"],
        change: stockInfo["10. change percent"],
        high: stockInfo["03. high"],
        low: stockInfo["04. low"],
      });
    } catch (err) {
      setError(err.message);
      setStockData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWatchlist = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/stocks/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ symbol: stockData.symbol }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMsg(`${stockData.symbol} added to your watchlist ✅`);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error("Add to watchlist failed", err);
      setError("Error adding to watchlist");
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Search Stock</h2>
      <form onSubmit={handleSearch} className="flex space-x-2">
        <input
          type="text"
          placeholder="Enter Stock Symbol (e.g., AAPL)"
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value)}
          className="p-2 border rounded w-64"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      {loading && <p className="mt-2 text-gray-600">Fetching stock data...</p>}
      {error && <p className="mt-2 text-red-500">Error: {error}</p>}
      {successMsg && <p className="mt-2 text-green-600">{successMsg}</p>}

      {stockData && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h3 className="text-lg font-semibold">
            {stockData.symbol} - 📊 ${stockData.price}
          </h3>
          <p>
            📉 Change:{" "}
            <span className={stockData.change.includes("-") ? "text-red-500" : "text-green-500"}>
              {stockData.change}
            </span>
          </p>
          <p>📈 High: <strong>${stockData.high}</strong></p>
          <p>📉 Low: <strong>${stockData.low}</strong></p>

          {/* Add to Watchlist Button */}
          <button
            onClick={handleAddToWatchlist}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          >
            ➕ Add to Watchlist
          </button>
        </div>
      )}
    </div>
  );
}

export default StockSearch;
