const express = require("express");
const router = express.Router();

const {
  createOrder,
  verifyPayment
} = require("../controllers/paymentController");

const authMiddleware = require("../middleware/authMiddleware");

// Create order
router.post("/create-order", authMiddleware, createOrder);

// Verify payment
router.post("/verify", authMiddleware, verifyPayment);

module.exports = router;