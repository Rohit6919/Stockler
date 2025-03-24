const Stock = require("../models/stock")
const mongoose = require("mongoose");

const getAllStocks = async (req, res) => {
    try {
        const stocks = await Stock.find().sort({ updatedAt: -1 });

        if (!stocks || stocks.length === 0) {
            return res.status(404).json({ message: "No stocks found" });
        }

        res.status(200).json(stocks);

    } catch (error) {
        console.error("Error:", error.message); // Log the detailed error message
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


const addStock = async (req, res) => {
    const { symbol, name, price, change = 0, percentageChange = 0, high = 0, low = 0, volume = 0 } = req.body;

    if (!symbol || !name || !price) {
        return res.status(400).json({ message: "Please provide symbol, name, and price" });
    }

    try {
        const newStock = new Stock({
            symbol,
            name,
            price,
            change,
            percentageChange,
            high,
            low,
            volume,
        });

        const savedStock = await newStock.save();
        res.status(201).json(savedStock);

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Failed to add new stock" });
    }
};


const deleteStock = async (req, res) => {
    const { id } = req.params;
    console.log("Raw ID from request:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log("Invalid ID format:", id);
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        const stock = await Stock.findById(id);
        if (!stock) {
            console.log("Stock not found in DB:", id);
            return res.status(404).json({ message: "Stock not found" });
        }

        await Stock.findByIdAndDelete(id);
        console.log("Stock deleted successfully:", id);
        res.status(200).json({ message: "Stock deleted successfully" });

    } catch (error) {
        console.error("Error deleting stock:", error.message);
        res.status(500).json({ 
            message: "Failed to delete stock", 
            error: error.message 
        });
    }
};


  module.exports = {
    getAllStocks,
    addStock,
    deleteStock,
  }