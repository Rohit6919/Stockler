const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    watchlist: {
        type: [
          {
            symbol: String,
            name: String
          }
        ],
        default: []
      }
      
    ,
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("User", userSchema);
