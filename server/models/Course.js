const mongoose = require("mongoose");
const Counter = require("./Counter");

const courseSchema = new mongoose.Schema({
  courseId: {
    type: Number,
    unique: true
  },

  title: {
    type: String,
    required: true
  },

  description: String,

  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  price: {
    type: Number,
    default: 0
  },

  isPublished: {
    type: Boolean,
    default: false
  },

  // ✅ UPDATED STRUCTURE
  content: [
    {
      title: String,
      type: {
        type: String,
        enum: ["video", "file"],
      },
      url: String
    }
  ]

}, { timestamps: true });

// 🔥 AUTO INCREMENT
courseSchema.pre("save", async function () {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { name: "courseId" },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );

    this.courseId = counter.value;
  }
});

module.exports = mongoose.model("Course", courseSchema);