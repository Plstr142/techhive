const express = require("express");
const router = express.Router();
// Controllers
const {
  create,
  list,
  remove,
  listby,
  searchFilters,
} = require("../controllers/product.js");

router.post("/product", create);
router.get("/products/:count", list);
router.delete("/product/:id", remove);
router.post("/productby", listby);
router.post("/search/filters", searchFilters);

module.exports = router;
