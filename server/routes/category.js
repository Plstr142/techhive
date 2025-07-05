const express = require("express");
const router = express.Router();
const { create } = require("../controllers/category.js");

router.post("/category", create);
router.get("/category");
router.delete("/category/:id");

module.exports = router;
