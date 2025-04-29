const Stock = require("../models/stock")
const mongoose = require("mongoose");
const User = require("../models/User");


const addToWatchlist = async (req, res) => {
    const { userId } = req.user;
    const { symbol, name } = req.body;
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Prevent duplicates
      const alreadyExists = user.watchlist.some(stock => stock.symbol === symbol);
      if (alreadyExists) {
        return res.status(400).json({ message: "Stock already in watchlist" });
      }
  
      // Add stock
      user.watchlist.push({ symbol, name });
      await user.save();
  
      res.status(200).json({ message: "Stock added", watchlist: user.watchlist });
    } catch (error) {
      console.error("Error adding stock:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };


// ✅ Remove stock from watchlist
const removeFromWatchlist = async (req, res) => {
    const { userId } = req.user;
    const { symbol } = req.params;
  
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const beforeLength = user.watchlist.length;
      user.watchlist = user.watchlist.filter(stock => stock.symbol !== symbol);
      const afterLength = user.watchlist.length;
  
      if (beforeLength === afterLength) {
        return res.status(404).json({ message: "Stock not found in watchlist" });
      }
  
      await user.save();
  
      res.status(200).json({ message: "Stock removed", watchlist: user.watchlist });
    } catch (err) {
      console.error("❌ Error removing stock:", err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };
  

// ✅ Get user's watchlist
const getWatchlist = async (req, res) => {
  const { userId } = req.user;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    
    // Wrap the watchlist in an object to match frontend expectation
    res.status(200).json({ watchlist: user.watchlist });
  } catch (error) {
    console.error("Error getting watchlist:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// ✅ Export watchlist functions
module.exports = {
    addToWatchlist,
    removeFromWatchlist,
    getWatchlist
};
