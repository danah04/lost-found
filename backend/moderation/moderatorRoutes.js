const express = require("express");
const {
  getModeratorDashboard,
  getPendingListings,
  reviewListing,
  editListing,
  changeListingVisibility,
  getReports,
  resolveReport,
  getClaimsQueue,
  verifyClaim,
  confirmReturn,
} = require("./moderatorController");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);
router.use(authorizeRoles("moderator"));

router.get("/dashboard", getModeratorDashboard);
router.get("/listings/pending", getPendingListings);
router.patch("/listings/:id/review", reviewListing);
router.patch("/listings/:id/edit", editListing);
router.patch("/listings/:id/visibility", changeListingVisibility);

router.get("/reports", getReports);
router.patch("/reports/:id/resolve", resolveReport);

router.get("/claims", getClaimsQueue);
router.patch("/claims/:id/verify", verifyClaim);
router.patch("/claims/:id/return", confirmReturn);

module.exports = router;
