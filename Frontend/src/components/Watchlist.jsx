import React, { useEffect, useState } from "react";

const BACKEND_URL = "http://localhost:5000/api";
const ALPHA_API_KEY = "JFPMH04HGPAMMMDL";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stockSymbol, setStockSymbol] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // Fetch stock prices from Alpha Vantage
  const fetchLivePrices = async (symbols) => {
    const results = await Promise.all(
      symbols.map(async (item) => {
        try {
          const res = await fetch(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${item.symbol}&apikey=${ALPHA_API_KEY}`
          );
          const data = await res.json();

          const quote = data["Global Quote"];
          const price = quote?.["05. price"];
          const changePercent = quote?.["10. change percent"];

          return {
            ...item,
            price: price ? parseFloat(price) : "N/A",
            change: changePercent || "N/A",
          };
        } catch (err) {
          console.error("Error fetching price:", err);
          return { ...item, price: "N/A", change: "N/A" };
        }
      })
    );

    setWatchlist(results);
    setLoading(false);
  };

  // Load user's watchlist from backend
  const fetchWatchlist = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/stocks/watchlist`, {
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok && data.watchlist?.length > 0) {
        fetchLivePrices(data.watchlist);
      } else {
        setWatchlist([]);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching watchlist", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const handleAdd = async () => {
    if (!stockSymbol.trim()) {
      alert("Enter a valid stock symbol.");
      return;
    }

    setIsAdding(true);
    const upperSymbol = stockSymbol.toUpperCase();

    try {
      const res = await fetch(`${BACKEND_URL}/stocks/watchlist/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ symbol: upperSymbol, name: upperSymbol }),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = { error: text };
      }

      if (res.ok) {
        // Fetch price from Alpha Vantage
        const priceRes = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${upperSymbol}&apikey=${ALPHA_API_KEY}`
        );
        const priceData = await priceRes.json();
        const quote = priceData["Global Quote"];
        const price = quote?.["05. price"];
        const changePercent = quote?.["10. change percent"];

        const newStock = {
          symbol: upperSymbol,
          name: upperSymbol,
          price: price ? parseFloat(price) : "N/A",
          change: changePercent || "N/A",
        };

        setWatchlist((prev) => [newStock, ...prev]);
        setStockSymbol("");
      } else {
        alert(data.error || "Failed to add stock.");
      }
    } catch (err) {
      console.error("Add failed:", err);
      alert("Something went wrong.");
    }

    setIsAdding(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">📊 Your Watchlist</h1>

      {/* Add Stock Input */}
      <div className="flex justify-center mb-6 gap-2">
        <input
          type="text"
          placeholder="Enter Stock Symbol"
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
          className="border border-gray-300 p-2 rounded w-64"
        />
        <button
          onClick={handleAdd}
          disabled={isAdding}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isAdding ? "Adding..." : "Add"}
        </button>
      </div>

      {/* Watchlist Display */}
      {loading ? (
        <p className="text-center">⏳ Loading your watchlist...</p>
      ) : watchlist.length === 0 ? (
        <p className="text-center text-gray-500">Your watchlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {watchlist.map((stock, idx) => (
            <div key={idx} className="bg-white rounded shadow p-4 text-center">
              <h2 className="text-xl font-semibold">{stock.symbol}</h2>
              <p
                className={`text-sm ${
                  stock.change?.includes("-") ? "text-red-500" : "text-green-600"
                }`}
              >
                {stock.change || "Fetching..."}
              </p>
              <p className="text-lg font-bold">
                {stock.price !== "N/A"
                  ? `💰 ₹${Number(stock.price).toFixed(2)}`
                  : "💰 N/A"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
