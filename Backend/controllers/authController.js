const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// ✅ Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const signupUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: "Signup successful" });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // ✅ Generate JWT Token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // ✅ Set HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,  // ❌ Change to true if using HTTPS (localhost needs false)
            sameSite: "Lax",
            maxAge: 24 * 60 * 60 * 1000, // ✅ Token expires in 1 day
        });

        
        res.json({ message: "Login successful" , token});
    } catch (error) {
        console.error("❌ Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const logoutUser = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false, // Change to true for production
        sameSite: "Lax",
    });
    console.log("✅ Logout successful - Token removed");
    res.status(200).json({ message: "Logout successful" });
};

const verifyUser = (req, res) => {
    const token = req.cookies?.token;
    if (!token) {
        console.log("❌ No token found in cookies");
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ userId: decoded.userId });
    } catch (error) {
        console.log("❌ Invalid token:", error.message);
        res.status(403).json({ message: "Invalid token" });
    }
};

module.exports = { signupUser, loginUser, logoutUser, verifyUser };
