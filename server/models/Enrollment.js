// models/Enrollment.js
const mongoose = require("mongoose");
const Counter = require("./Counter");

const enrollmentSchema = new mongoose.Schema({
  enrollmentId: {
    type: Number,
    unique: true
  },

  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  },

  progress: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
  certificateIssued: { type: Boolean, default: false }

}, { timestamps: true });

// 🔥 AUTO ID
enrollmentSchema.pre("save", async function () {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { name: "enrollmentId" },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );
    this.enrollmentId = counter.value;
  }
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);