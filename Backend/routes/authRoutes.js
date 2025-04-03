const express = require("express");
const { signupUser, loginUser, logoutUser, verifyUser } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// ✅ New route to check authentication status using cookies
router.get("/verifyUser", verifyUser);

module.exports = router;
