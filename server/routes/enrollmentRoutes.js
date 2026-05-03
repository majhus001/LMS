// routes/enrollmentRoutes.js
const express = require("express");
const router = express.Router();

const {
  enrollCourse,
  getMyCourses,
  updateProgress,
} = require("../controllers/enrollmentController");

const authMiddleware = require("../middleware/authMiddleware");

// Enroll in course
router.post("/", authMiddleware, enrollCourse);

// Get my enrolled courses
router.get("/my", authMiddleware, getMyCourses);

// Update progress
router.put("/:id/progress", authMiddleware, updateProgress);

module.exports = router;