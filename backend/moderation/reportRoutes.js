const express = require("express");
const { submitReport, getMyReports } = require("./reportController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);
router.post("/", submitReport);
router.get("/my", getMyReports);

module.exports = router;
