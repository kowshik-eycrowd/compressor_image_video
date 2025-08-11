require("dotenv").config();

module.exports = {
  port: process.env.PORT || 4000,
  allowedOrigins: (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .filter(Boolean),
  maxFileSize: Number(process.env.MAX_FILE_MB || 200) * 1024 * 1024,
  imageQuality: Number(process.env.IMAGE_QUALITY || 75),
};
