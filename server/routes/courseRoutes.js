// routes/courseRoutes.js
const express = require("express");
const router = express.Router();

const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Create course
router.post(
  "/",
  authMiddleware,
  roleMiddleware("instructor", "admin"),
  createCourse
);

// Get all courses
router.get("/", getCourses);

// Get single course
router.get("/:id", getCourseById);

// Update course
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("instructor", "admin"),
  updateCourse
);

// Delete course
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteCourse
);

module.exports = router;