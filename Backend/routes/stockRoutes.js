const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { addToWatchlist, removeFromWatchlist, getWatchlist } = require("../controllers/stockController");


// ✅ Add stock to watchlist
router.post("/watchlist/add", authMiddleware, addToWatchlist);

// ✅ Remove stock from watchlist
router.delete("/watchlist/remove/:stockId", authMiddleware, removeFromWatchlist);

// ✅ Get user's watchlist
router.get("/watchlist", authMiddleware, getWatchlist);







module.exports = router;
