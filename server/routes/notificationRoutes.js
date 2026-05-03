const express = require("express");
const router = express.Router();

const Notification = require("../models/Notification");
const authMiddleware = require("../middleware/authMiddleware");
const { sendTestNotification } = require("../controllers/notificationController");

// 🔥 Test route
router.post("/test", authMiddleware, sendTestNotification);
// Get notifications
router.get("/", authMiddleware, async (req, res) => {
  const data = await Notification.find({ user: req.user.id })
    .sort({ createdAt: -1 });

  res.json(data);
});

// Mark as read
router.put("/:id", authMiddleware, async (req, res) => {
  const data = await Notification.findByIdAndUpdate(
    req.params.id,
    { read: true },
    { new: true }
  );

  res.json(data);
});

module.exports = router;