const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const { getRealtimeStock } = require("../controllers/realtimeController");
const { getAllStocks, addStock, deleteStock } = require("../controllers/stockController");

router.get("/", authMiddleware, getAllStocks);
router.post("/", authMiddleware, addStock);
router.delete("/:id", authMiddleware, deleteStock);

router.get("/realtime/:symbol", getRealtimeStock);

module.exports = router;
