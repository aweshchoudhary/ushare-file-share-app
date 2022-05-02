const File = require("../models/File");

const router = require("express").Router();

router.get("/:uuid", async (req, res) => {
  const file = await File.findOne({ uuid: req.params.uuid });
  if (!file) {
    res.render("pages/download", { error: "Link has been expired." });
  }
  const FILE_PATH = `${__dirname}/../${file.path}`;
  res.download(FILE_PATH);
});

module.exports = router;
