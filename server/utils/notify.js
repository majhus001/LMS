const Notification = require("../models/Notification");
const sendEmail = require("./email");

const notifyUser = async ({ user, email, message, type, html }) => {
  try {
    console.log("🔔 notifyUser called");

    if (!user || !message) {
      console.error("❌ Missing required fields");
      return;
    }

    // ✅ Save in DB
    await Notification.create({
      user,
      message,
      type
    });

    console.log("✅ Notification saved");

    // 📧 SEND ONLY HTML (NO TEXT)
    if (email && html) {
      await sendEmail(
        email,
        "🔔 Notification",
        html
      );
    }

  } catch (err) {
    console.error("❌ Notification Error:", err.message);
  }
};

module.exports = notifyUser;