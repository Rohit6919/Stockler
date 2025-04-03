const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    console.log("🔍 Cookies received in authMiddleware:", req.cookies); // Debugging

    const token = req.cookies?.token; // Get token from cookies
    if (!token) {
        console.log("❌ No token found in cookies");
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Decoded Token:", decoded); // Debugging
        req.user = decoded; // ✅ Store user in req.user
        next(); 
    } catch (error) {
        console.log("❌ JWT Verification Failed:", error.message);
        return res.status(403).json({ message: "Unauthorized: Invalid token" });
    }
};

module.exports = authMiddleware;
