const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");
const User = require("../models/User");
const notifyUser = require("../utils/notify");
const { enrollmentTemplate } = require("../utils/emailTemplates");

exports.enrollCourse = async (req, res, next) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findOne({ courseId });

    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    const existing = await Enrollment.findOne({
      student: req.user.id,
      course: course._id,
    });

    if (existing) {
      return res.status(400).json({ msg: "Already enrolled" });
    }

    const enrollment = await Enrollment.create({
      student: req.user.id,
      course: course._id,
    });

    const student = await User.findById(req.user.id);

    if (student) {
      await notifyUser({
        user: student._id,
        email: student.email,
        message: `Enrolled in course: ${course.title}`,
        type: "enrollment",
        html: enrollmentTemplate(course.title)
      });
    }

    return res.json(enrollment);

  } catch (err) {
    return next(err);
  }
};
// Get My Enrollments
exports.getMyCourses = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user.id })
      .populate({
        path: "course",
        select: "courseId title description price"
      });

    return res.json(enrollments);
  } catch (err) {
    return next(err);
  }
};

// Update Progress (use enrollmentId instead of _id)
exports.updateProgress = async (req, res, next) => {
  try {
    const { progress } = req.body;

    const enrollment = await Enrollment.findOneAndUpdate(
      { enrollmentId: req.params.id }, // ✅ FIXED
      { progress },
      { new: true }
    );

    if (!enrollment) {
      return res.status(404).json({ msg: "Enrollment not found" });
    }

    return res.json(enrollment);
  } catch (err) {
    return next(err);
  }
};