const Quiz = require("../models/Quiz");
const User = require("../models/User");
const notifyUser = require("../utils/notify");
const { quizResultTemplate } = require("../utils/emailTemplates");

exports.submitQuiz = async (req, res, next) => {
  try {
    const { answers } = req.body;

    const quiz = await Quiz.findOne({ quizId: req.params.id });

    if (!quiz) {
      return res.status(404).json({ msg: "Quiz not found" });
    }

    let score = 0;

    quiz.questions.forEach((q, index) => {
      if (q.correctAnswer === answers[index]) {
        score++;
      }
    });

    const student = await User.findById(req.user.id);

    if (student) {
      await notifyUser({
        user: student._id,
        email: student.email,
        message: `Quiz submitted. Score: ${score}/${quiz.questions.length}`,
        type: "quiz",
        html: quizResultTemplate(score, quiz.questions.length)
      });
    }

    return res.json({
      score,
      total: quiz.questions.length,
    });

  } catch (err) {
    return next(err);
  }
};
// Create Quiz
exports.createQuiz = async (req, res, next) => {
  try {
    const { courseId, title, questions, totalMarks } = req.body;

    const course = await Course.findOne({ courseId });

    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    const quiz = await Quiz.create({
      course: course._id,
      title,
      questions,
      totalMarks
    });

    return res.json(quiz);

  } catch (err) {
    return next(err);
  }
};

// Get Quiz by Course
exports.getQuizByCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findOne({ courseId });

    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    const quiz = await Quiz.findOne({ course: course._id });

    return res.json(quiz);

  } catch (err) {
    return next(err);
  }
};
