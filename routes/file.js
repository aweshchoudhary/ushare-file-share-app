const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const { v4: uuid4 } = require("uuid");
const File = require("../models/File");

let storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, path.join(__dirname, "../", "uploads")),
  filename: (req, file, cb) =>
    cb(
      null,
      `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(
        file.originalname
      )}`
    ),
});

let upload = multer({
  storage,
  limits: { fileSize: 1000000 * 100 },
});

router.post("/", upload.single("myfile"), async (req, res) => {
  // check for file
  if (!req.file) {
    return res.status(400).json({ error: "All fields are required." });
  }
  // upload file
  const file = new File({
    filename: req.file.filename,
    uuid: uuid4(),
    path: req.file.path,
    size: req.file.size,
  });
  const response = await file.save();
  res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}` });
});

module.exports = router;
