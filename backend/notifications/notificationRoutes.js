const express = require("express");
const {
  getMyNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} = require("./notificationController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);
router.get("/", getMyNotifications);
router.patch("/read-all", markAllNotificationsAsRead);
router.patch("/:notificationId/read", markNotificationAsRead);

module.exports = router;
