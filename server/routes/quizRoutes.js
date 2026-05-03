// routes/quizRoutes.js
const express = require("express");
const router = express.Router();

const {
  createQuiz,
  getQuizByCourse,
  submitQuiz,
} = require("../controllers/quizController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Create quiz (Instructor only)
router.post(
  "/",
  authMiddleware,
  roleMiddleware("instructor", "admin"),
  createQuiz
);

// Get quiz by course
router.get("/course/:courseId", authMiddleware, getQuizByCourse);

// Submit quiz
router.post("/:id/submit", authMiddleware, submitQuiz);

module.exports = router;