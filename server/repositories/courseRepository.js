// repositories/courseRepository.js
const Course = require("../models/Course");

// Create Course
exports.createCourse = async (data) => {
  return await Course.create(data);
};

// Get All Courses
exports.getAllCourses = async () => {
  return await Course.find().populate("instructor", "name email");
};

// Get Course by ID
exports.getCourseById = async (id) => {
  return await Course.findById(id).populate("instructor");
};

// Update Course
exports.updateCourse = async (id, data) => {
  return await Course.findByIdAndUpdate(id, data, { new: true });
};

// Delete Course
exports.deleteCourse = async (id) => {
  return await Course.findByIdAndDelete(id);
};