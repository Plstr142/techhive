const express = require("express");
const router = express.Router();
// Controllers
const {
  create,
  list,
  update,
  remove,
  listby,
  searchFilters,
} = require("../controllers/product.js");

router.post("/product", create);
router.get("/products/:count", list);
router.put("/product/:id", update);
router.delete("/product/:id", remove);
router.post("/productby", listby);
router.post("/search/filters", searchFilters);

module.exports = router;
