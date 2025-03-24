const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true,
        uppercase: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    change: {
        type: Number,
        required: true,
    },
    percentageChange: {
        type: Number,
        required: true,
    },
    high: {
        type: Number
    },
    low: {
        type: Number
    },
    volume: {
        type: Number
    }
}, { timestamps: true });  // ✅ Automatically handles createdAt and updatedAt

const Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock;
