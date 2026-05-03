const multer = require("multer");

const storage = multer.diskStorage({});

const upload = multer({
  storage,

  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB
  },

  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith("video/") ||
      file.mimetype === "application/pdf"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only video and PDF allowed"), false);
    }
  }
});

module.exports = upload;