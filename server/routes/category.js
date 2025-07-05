const express = require("express");
const router = express.Router();
const {
  create,
  list,
  remove: deleteCategory,
} = require("../controllers/category.js");

router.post("/category", create);
router.get("/category", list);
router.delete("/category/:id", deleteCategory);

module.exports = router;
