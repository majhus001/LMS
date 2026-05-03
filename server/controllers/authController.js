// controllers/authController.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate Token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// Register
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const user = await User.create({ name, email, password, role });

    return res.json({
      user,
      token: generateToken(user),
    });
  } catch (err) {
    return next(err); // 🔥 IMPORTANT FIX
  }
};

// Login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    return res.json({
      user,
      token: generateToken(user),
    });
  } catch (err) {
    return next(err); // 🔥 IMPORTANT FIX
  }
};