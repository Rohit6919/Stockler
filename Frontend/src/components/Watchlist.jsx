import React, { useEffect, useState } from "react";

const BACKEND_URL = "http://localhost:5000/api";
const RAPID_API_KEY = "fddc19a597msh9620cdd52bd60b7p1ace8ajsn32068453019b";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stockSymbol, setStockSymbol] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const fetchLivePrices = async (symbols) => {
    const results = await Promise.all(
      symbols.map(async (item) => {
        try {
          const res = await fetch(
            `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=${item.symbol}&region=IN`,
            {
              method: "GET",
              headers: {
                "X-RapidAPI-Key": RAPID_API_KEY,
                "X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
              },
            }
          );
          const data = await res.json();
          return {
            ...item,
            price: data.price?.regularMarketPrice?.raw || "N/A",
            change: data.price?.regularMarketChangePercent?.fmt || "N/A",
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

  const fetchWatchlist = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/stocks/watchlist`, {
        credentials: "include",
      });
      const data = await res.json();
      console.log("Raw watchlist from backend:", data.watchlist);

      if (res.ok) {
        setWatchlist(data.watchlist || []);
        if (data.watchlist?.length > 0) {
          fetchLivePrices(data.watchlist);
        } else {
          setLoading(false);
        }
      } else {
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
      console.log("Add stock response:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = { error: text };
      }

      if (res.ok) {
        // Fetch live price for the newly added stock
        const priceRes = await fetch(
          `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=${upperSymbol}&region=IN`,
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Key": RAPID_API_KEY,
              "X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
            },
          }
        );
        const priceData = await priceRes.json();

        const newStock = {
          symbol: upperSymbol,
          name: upperSymbol,
          price: priceData.price?.regularMarketPrice?.raw || "N/A",
          change: priceData.price?.regularMarketChangePercent?.fmt || "N/A",
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

      {/* Search & Add */}
      <div className="flex justify-center mb-6 gap-2">
        <input
          type="text"
          placeholder="Enter Stock Symbol (e.g., RELIANCE.BO, TCS.NS)"
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value)}
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
