const express = require("express");
const router = express.Router();
const multerConfig = require("../config/multer");
const { uploadFile } = require("../controllers/uploadController");

router.post("/", multerConfig.single("file"), uploadFile);

module.exports = router;
