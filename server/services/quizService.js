// services/quizService.js
const Quiz = require("../models/Quiz");

// Create Quiz
exports.createQuiz = async (data) => {
  return await Quiz.create(data);
};

// Get Quiz by Course
exports.getQuizByCourse = async (courseId) => {
  return await Quiz.findOne({ course: courseId });
};

// Submit Quiz
exports.submitQuiz = async (quizId, answers) => {
  const quiz = await Quiz.findById(quizId);

  if (!quiz) throw new Error("Quiz not found");

  let score = 0;

  quiz.questions.forEach((q, index) => {
    if (q.correctAnswer === answers[index]) {
      score++;
    }
  });

  return {
    score,
    total: quiz.questions.length,
  };
};