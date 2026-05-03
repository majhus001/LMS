
const crypto = require("crypto");
const mongoose = require("mongoose");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const razorpay = require("../config/razorpay");

const findCourseByIdentifier = async (courseId) => {
  if (courseId === undefined || courseId === null) return null;

  const numericCourseId = Number(courseId);
  if (!Number.isNaN(numericCourseId)) {
    const byCourseId = await Course.findOne({ courseId: numericCourseId });
    if (byCourseId) return byCourseId;

    // Fallback for legacy/wrongly typed records where courseId is stored as string in MongoDB.
    const rawCourse = await Course.collection.findOne({
      courseId: String(courseId),
    });
    if (rawCourse) return Course.hydrate(rawCourse);
  }

  if (mongoose.Types.ObjectId.isValid(String(courseId))) {
    return Course.findById(courseId);
  }

  return null;
};
// 🔥 CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const { courseId } = req.body;
    if (courseId === undefined || courseId === null || courseId === "") {
      return res.status(400).json({ msg: "courseId is required" });
    }

    const course = await findCourseByIdentifier(courseId);

    if (!course) {
      return res.status(404).json({ msg: `Course not found for courseId: ${courseId}` });
    }

    const options = {
      amount: course.price * 100, // paisa
      currency: "INR",
      receipt: `receipt_${courseId}`,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      courseId: course.courseId
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 🔥 VERIFY PAYMENT
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      courseId
    } = req.body;
    if (courseId === undefined || courseId === null || courseId === "") {
      return res.status(400).json({ msg: "courseId is required" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ msg: "Payment verification failed" });
    }

    // ✅ Payment success → enroll user
    const course = await findCourseByIdentifier(courseId);

    if (!course) {
      return res.status(404).json({ msg: `Course not found for courseId: ${courseId}` });
    }

    await Enrollment.create({
      student: req.user.id,
      course: course._id
    });

    res.json({ msg: "Payment successful & enrolled" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
