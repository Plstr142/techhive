const express = require("express");
const router = express.Router();

const { register, login, currentUser } = require("../controllers/auth");
// import middleware
const { authCheck, adminCheck } = require("../middlewares/authCheck");

router.post("/register", register);
router.post("/login", login);
// The difference is that middleware comes in between.
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);

module.exports = router;
