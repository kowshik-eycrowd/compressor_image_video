const path = require("path");
const { imageQuality } = require("../config/env");
const { compressImage } = require("../services/compressionService");
const { getFileSize, getPublicUrl } = require("../services/fileService");

async function uploadFile(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ ok: false, error: "No file uploaded" });
    }

    const file = req.file;
    const srcPath = file.path;
    const srcSize = getFileSize(srcPath);

    let compressedData = null;
    if (file.mimetype.startsWith("image/")) {
      const outName = `${path.parse(file.filename).name}_compressed.jpg`;
      const outPath = path.join("uploads_compressed", outName);
      compressedData = await compressImage(srcPath, outPath, imageQuality);
    }

    res.json({
      ok: true,
      originalName: file.originalname,
      storedAs: file.filename,
      sizeOriginal: srcSize,
      urlOriginal: getPublicUrl(req, "uploads", file.filename),
      ...(compressedData && {
        sizeCompressed: compressedData.size,
        storedAsCompressed: path.basename(compressedData.path),
        urlCompressed: getPublicUrl(
          req,
          "uploads_compressed",
          path.basename(compressedData.path)
        ),
      }),
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
}

module.exports = { uploadFile };
