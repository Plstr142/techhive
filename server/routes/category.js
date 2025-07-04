const express = require("express");
const router = express.Router();

router.get("/category", (req, res) => {
  res.send("Hello get category Phongs4thon");
});

module.exports = router;
