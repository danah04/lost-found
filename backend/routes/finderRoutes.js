const express = require("express");

const {
  getFinderDashboard,
  reportFoundItem,
  getMyFoundItems,
  getFoundItemById,
  updateFoundItemStatus,
  deleteFoundItem,
  getSuggestedMatches,
} = require("../controllers/finderController");

const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);
router.use(authorizeRoles("finder", "moderator"));

router.get("/dashboard", getFinderDashboard);
router.post("/found-items", reportFoundItem);
router.get("/my-found-items", getMyFoundItems);
router.get("/found-items/:id", getFoundItemById);
router.patch("/found-items/:id/status", updateFoundItemStatus);
router.delete("/found-items/:id", deleteFoundItem);
router.get("/suggested-matches", getSuggestedMatches);

module.exports = router;
