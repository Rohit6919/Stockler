const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const stockRoutes = require("./routes/stockRoutes");


dotenv.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true })); 
app.use(cors())



app.use("/api/stocks", stockRoutes);

mongoose
    .connect(process.env.MONGO_URL)
    .then(()=>console.log("mongoose connecteted"))
    .catch((error)=>console.log(error))


app.listen(5000 , ()=>{
    console.log("servre is running on 5000 port")
});