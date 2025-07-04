const express = require("express");
const router = express.Router();

router.get("/register", (req, res) => {
  res.send("Hello get phongs4thon");
});

module.exports = router;
