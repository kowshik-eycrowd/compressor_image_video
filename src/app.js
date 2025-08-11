const express = require("express");
const cors = require("cors");
const path = require("path");
const logger = require("./config/logger");
const { allowedOrigins } = require("./config/env");

const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(logger);

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use(
  "/uploads_compressed",
  express.static(path.join(__dirname, "..", "uploads_compressed"))
);

app.use("/upload", uploadRoutes);

app.get("/health", (_req, res) => res.json({ ok: true }));

module.exports = app;
