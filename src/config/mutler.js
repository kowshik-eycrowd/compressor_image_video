const multer = require("multer");
const path = require("path");
const { maxFileSize } = require("./env");

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, "uploads"),
  filename: (_req, file, cb) => {
    const ts = Date.now();
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, "_");
    cb(null, `${ts}_${safeName}`);
  },
});

const fileFilter = (_req, file, cb) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("video/")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only image and video files are allowed"));
  }
};

module.exports = multer({
  storage,
  limits: { fileSize: maxFileSize },
  fileFilter,
});
