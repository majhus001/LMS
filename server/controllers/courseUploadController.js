const cloudinary = require("../config/cloudinary");
const Course = require("../models/Course");
const fs = require("fs");

// Upload Video / PDF
exports.uploadContent = async (req, res, next) => {
  try {
    const { title } = req.body;

    let url = null;
    let type = null;

    // 🔥 VIDEO UPLOAD
    if (req.files?.video) {
      const result = await cloudinary.uploader.upload(
        req.files.video[0].path,
        {
          resource_type: "auto",
          folder: "courses/videos",
        }
      );

      url = result.secure_url;
      type = "video";

      // cleanup
      fs.unlinkSync(req.files.video[0].path);
    }

    // 🔥 PDF UPLOAD
    if (req.files?.file) {
      const result = await cloudinary.uploader.upload(
        req.files.file[0].path,
        {
          resource_type: "auto",
          folder: "courses/files",
        }
      );

      url = result.secure_url;
      type = "file";

      // cleanup
      fs.unlinkSync(req.files.file[0].path);
    }

    if (!url) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    // 🔥 Save to DB
    const course = await Course.findOneAndUpdate(
      { courseId: req.params.id },
      {
        $push: {
          content: {
            title,
            type,
            url,
          },
        },
      },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    return res.json(course);

  } catch (err) {
    return next(err);
  }
};