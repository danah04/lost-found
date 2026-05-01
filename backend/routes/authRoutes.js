const express = require("express");

const {
  registerUser,
  loginUser,
  getCurrentUser,
  roleCheck,
  logoutUser,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getCurrentUser);
router.get("/role-check", protect, roleCheck);
router.post("/logout", protect, logoutUser);

module.exports = router;