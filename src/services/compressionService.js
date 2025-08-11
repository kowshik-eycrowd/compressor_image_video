const sharp = require("sharp");
const fs = require("fs");

async function compressImage(srcPath, outPath, quality) {
  await sharp(srcPath).jpeg({ quality, mozjpeg: true }).toFile(outPath);

  const size = fs.statSync(outPath).size;
  return { path: outPath, size };
}

module.exports = { compressImage };
