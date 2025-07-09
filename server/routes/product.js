const express = require("express");
const router = express.Router();
// Controllers
const {
  create,
  list,
  update,
  read,
  remove,
  listby,
  searchFilters,
} = require("../controllers/product.js");

router.post("/product", create);
// count products by entered quantity.
router.get("/products/:count", list);
// only one product
router.get("/product/:id", read);
router.put("/product/:id", update);
router.delete("/product/:id", remove);
router.post("/productby", listby);
router.post("/search/filters", searchFilters);

module.exports = router;
