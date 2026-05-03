// models/Quiz.js
const mongoose = require("mongoose");
const Counter = require("./Counter");

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: String
});

const quizSchema = new mongoose.Schema({
  quizId: {
    type: Number,
    unique: true
  },

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },

  title: String,
  questions: [questionSchema],
  totalMarks: Number

}, { timestamps: true });

// 🔥 AUTO ID
quizSchema.pre("save", async function () {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { name: "quizId" },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );
    this.quizId = counter.value;
  }
});

module.exports = mongoose.model("Quiz", quizSchema);