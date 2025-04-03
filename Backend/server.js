require("dotenv").config();  // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const stockRoutes = require("./routes/stockRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// CORS Configuration
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true, // ✅ Allow cookies in requests
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization"
};

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Routes
app.use("/api/stocks", stockRoutes);
app.use("/api/auth", authRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((error) => console.error("❌ MongoDB Connection Error:", error));

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
