const Notification = require("./Notification");
const { successResponse, errorResponse } = require("../utils/apiResponse");

const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id }).sort({ createdAt: -1 });
    const unreadCount = await Notification.countDocuments({ recipient: req.user._id, isRead: false });

    return successResponse(res, 200, "Notifications fetched successfully", { notifications, unreadCount });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const markNotificationAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.notificationId, recipient: req.user._id },
      { isRead: true },
      { new: true }
    );

    if (!notification) return errorResponse(res, 404, "Notification not found");

    return successResponse(res, 200, "Notification marked as read", { notification });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const markAllNotificationsAsRead = async (req, res) => {
  try {
    await Notification.updateMany({ recipient: req.user._id, isRead: false }, { isRead: true });
    return successResponse(res, 200, "All notifications marked as read");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = {
  getMyNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
};
