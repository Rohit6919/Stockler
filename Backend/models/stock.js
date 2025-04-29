const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
    symbol: String,
    name: String,
    price: Number,
    change: Number,
    percentageChange: Number,
    high: Number,
    low: Number,
    volume: Number
}, { timestamps: true });  // ✅ Automatically handles createdAt and updatedAt

const Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock;
