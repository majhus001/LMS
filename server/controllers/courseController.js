const Course = require("../models/Course");
const User = require("../models/User");
const notifyUser = require("../utils/notify");
const { courseCreatedTemplate } = require("../utils/emailTemplates");

exports.createCourse = async (req, res, next) => {
  try {
    const course = await Course.create({
      ...req.body,
      instructor: req.user.id,
    });

    const instructor = await User.findById(req.user.id);

    if (instructor) {
      await notifyUser({
        user: instructor._id,
        email: instructor.email,
        message: `Course created: ${course.title}`,
        type: "course",
        html: courseCreatedTemplate(course.title)
      });
    }

    return res.json(course);

  } catch (err) {
    return next(err);
  }
};
// Get All Courses
exports.getCourses = async (req, res, next) => {
  try {
    console.log("📚 getCourses triggered");

    const courses = await Course.find()
      .populate("instructor", "name email");

    console.log("✅ Total courses:", courses.length);

    return res.json(courses);

  } catch (err) {
    console.error("❌ getCourses error:", err.message);
    return next(err);
  }
};

// Get Single Course
exports.getCourseById = async (req, res, next) => {
  try {
    console.log("🔍 getCourseById:", req.params.id);

    const course = await Course.findOne({ courseId: req.params.id });

    if (!course) {
      console.log("❌ Course not found");
      return res.status(404).json({ msg: "Course not found" });
    }

    console.log("✅ Course found:", course.title);

    return res.json(course);

  } catch (err) {
    console.error("❌ getCourseById error:", err.message);
    return next(err);
  }
};

// Update Course
exports.updateCourse = async (req, res, next) => {
  try {
    console.log("✏️ updateCourse:", req.params.id);
    console.log("update data:", req.body);

    const course = await Course.findOneAndUpdate(
      { courseId: req.params.id },
      req.body,
      { new: true }
    );

    if (!course) {
      console.log("❌ Course not found for update");
      return res.status(404).json({ msg: "Course not found" });
    }

    console.log("✅ Course updated:", course.title);

    return res.json(course);

  } catch (err) {
    console.error("❌ updateCourse error:", err.message);
    return next(err);
  }
};

// Delete Course
exports.deleteCourse = async (req, res, next) => {
  try {
    console.log("🗑 deleteCourse:", req.params.id);

    const course = await Course.findOneAndDelete({
      courseId: req.params.id,
    });

    if (!course) {
      console.log("❌ Course not found for deletion");
      return res.status(404).json({ msg: "Course not found" });
    }

    console.log("✅ Course deleted:", course.title);

    return res.json({ msg: "Course deleted" });

  } catch (err) {
    console.error("❌ deleteCourse error:", err.message);
    return next(err);
  }
};