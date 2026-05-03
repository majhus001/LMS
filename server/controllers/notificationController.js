const Notification = require("../models/Notification");
const User = require("../models/User");
const sendEmail = require("../utils/email");

// Get notifications
exports.getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    return res.json(notifications);
  } catch (err) {
    return next(err);
  }
};

// Mark as read
exports.markAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    return res.json(notification);
  } catch (err) {
    return next(err);
  }
};

// Test notification
exports.sendTestNotification = async (req, res, next) => {
  try {
    const { email, message } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const notification = await Notification.create({
      user: user._id,
      message: message || "Test notification 🚀",
      type: "test"
    });

    await sendEmail(
      email,
      "🎓 Test Notification",
      message || "You have a new notification"
    );

    return res.json(notification);

  } catch (err) {
    return next(err);
  }
};