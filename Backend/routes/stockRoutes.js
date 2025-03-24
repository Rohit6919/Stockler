const express =require('express')
const router = express.Router()
const { getRealtimeStock } = require("../controllers/realtimeController");

const { getAllStocks , addStock , deleteStock } = require("../controllers/stockController")

router.get('/',getAllStocks);
router.post('/',addStock);
router.delete('/:id',deleteStock);

router.get("/realtime/:symbol", getRealtimeStock);

module.exports = router;