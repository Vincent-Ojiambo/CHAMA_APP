// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    // 1. Get token from header
    const token = req.header("x-auth-token");

    // 2. Check if token exists
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Find user and attach to request
    req.user = await User.findById(decoded.user.id).select("-password");
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = { protect };
