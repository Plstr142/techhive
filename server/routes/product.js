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
const { authCheck, adminCheck } = require("../middlewares/authCheck.js");

router.post("/product", create);
router.get("/products/:count", list);
router.get("/product/:id", read);
router.put("/product/:id", update);
router.delete("/product/:id", remove);
router.post("/productby", listby);
router.post("/search/filters", searchFilters);

router.post("/images", authCheck, adminCheck, images);
router.delete("/removeimages", authCheck, adminCheck, removeImages);

module.exports = router;
