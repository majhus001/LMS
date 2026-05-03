const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const { uploadContent } = require("../controllers/courseUploadController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post(
  "/:id",
  authMiddleware,
  roleMiddleware("instructor"),
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "file", maxCount: 1 }
  ]),
  uploadContent
);

module.exports = router;