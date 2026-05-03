// services/enrollmentService.js
const Enrollment = require("../models/Enrollment");

// Enroll in Course
exports.enrollCourse = async (userId, courseId) => {
  const existing = await Enrollment.findOne({
    student: userId,
    course: courseId,
  });

  if (existing) {
    throw new Error("Already enrolled");
  }

  return await Enrollment.create({
    student: userId,
    course: courseId,
  });
};

// Get User Enrollments
exports.getUserEnrollments = async (userId) => {
  return await Enrollment.find({ student: userId }).populate("course");
};

// Update Progress
exports.updateProgress = async (enrollmentId, progress) => {
  return await Enrollment.findByIdAndUpdate(
    enrollmentId,
    { progress },
    { new: true }
  );
};

// Mark Course Completed
exports.markCompleted = async (enrollmentId) => {
  return await Enrollment.findByIdAndUpdate(
    enrollmentId,
    { completed: true, certificateIssued: true },
    { new: true }
  );
};