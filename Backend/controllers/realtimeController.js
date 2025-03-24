const axios = require("axios");

const getRealtimeStock = async (req, res) => {
  const { symbol } = req.params;  // Get the stock symbol from the URL
  const apiKey = "NW1HMZ4I01ZLV6UD";  // Your Alpha Vantage API key

  try {
    // Alpha Vantage API URL
    const response = await axios.get(
      `https://www.alphavantage.co/query`,
      {
        params: {
          function: "GLOBAL_QUOTE",
          symbol: symbol,
          apikey: apiKey
        }
      }
    );

    const stockData = response.data["Global Quote"];

    if (!stockData || Object.keys(stockData).length === 0) {
      return res.status(404).json({ message: "Stock not found or invalid symbol" });
    }

    // Clean the data to make it readable
    const stockInfo = {
      symbol: stockData["01. symbol"],
      price: parseFloat(stockData["05. price"]),
      change: parseFloat(stockData["09. change"]),
      percentageChange: parseFloat(stockData["10. change percent"]),
      high: parseFloat(stockData["03. high"]),
      low: parseFloat(stockData["04. low"]),
      volume: parseInt(stockData["06. volume"]),
      updatedAt: new Date()
    };

    res.status(200).json(stockInfo);
  } catch (error) {
    console.error("Error fetching stock data:", error);
    res.status(500).json({ message: "Failed to fetch real-time stock data" });
  }
};

module.exports = { getRealtimeStock };
