const fs = require("fs");
const path = require("path");

function getFileSize(filePath) {
  return fs.statSync(filePath).size;
}

function deleteFile(filePath) {
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
}

function getPublicUrl(req, folder, filename) {
  return `${req.protocol}://${req.get("host")}/${folder}/${encodeURIComponent(
    filename
  )}`;
}

module.exports = { getFileSize, deleteFile, getPublicUrl };
