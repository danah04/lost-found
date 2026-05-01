const express = require("express");
const {
  reportLostItem,
  getMyLostItems,
  browseFoundItems,
  getFoundItemDetails,
  submitClaim,
  getMyClaims,
  getSuggestedMatchesForLostItem,
} = require("./itemController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

router.post("/lost", authorizeRoles("owner", "finder", "moderator"), reportLostItem);
router.get("/lost/my", getMyLostItems);
router.get("/lost/:id/matches", getSuggestedMatchesForLostItem);

router.get("/found", browseFoundItems);
router.get("/found/:id", getFoundItemDetails);
router.post("/found/:id/claims", submitClaim);

router.get("/claims/my", getMyClaims);

module.exports = router;
