const express = require("express");
const router = express.Router();

const { authCheck } = require("../middlewares/authCheck");
const {
  createProfile,
  readProfile,
  deleteProfile,
  listProfile,
  updateProfile,
} = require("../controllers/profile");

router.post("/profile", authCheck, createProfile);

router.get("/profile/:id", authCheck, readProfile);

router.get("/profiles/:count", authCheck, listProfile);

router.put("/profile/:id", authCheck, updateProfile);

router.delete("/profile/:id", authCheck, deleteProfile);

module.exports = router;
