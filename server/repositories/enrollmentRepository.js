// repositories/enrollmentRepository.js
const Enrollment = require("../models/Enrollment");

// Create Enrollment
exports.createEnrollment = async (data) => {
  return await Enrollment.create(data);
};

// Find Enrollment
exports.findEnrollment = async (studentId, courseId) => {
  return await Enrollment.findOne({
    student: studentId,
    course: courseId,
  });
};

// Get User Enrollments
exports.getEnrollmentsByUser = async (userId) => {
  return await Enrollment.find({ student: userId }).populate("course");
};

// Update Enrollment
exports.updateEnrollment = async (id, data) => {
  return await Enrollment.findByIdAndUpdate(id, data, { new: true });
};

// Delete Enrollment
exports.deleteEnrollment = async (id) => {
  return await Enrollment.findByIdAndDelete(id);
};