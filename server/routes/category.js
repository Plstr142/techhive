const express = require("express");
const router = express.Router();
const { create, list, remove } = require("../controllers/category.js");
const { authCheck, adminCheck } = require("../middlewares/authCheck.js");

router.post("/category", authCheck, adminCheck, create);
router.get("/category", authCheck, adminCheck, list);
router.delete("/category/:id", authCheck, adminCheck, remove);

module.exports = router;
