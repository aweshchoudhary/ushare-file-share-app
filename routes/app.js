const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("pages/home");
});

module.exports = router;
