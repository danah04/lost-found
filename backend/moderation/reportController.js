const Report = require("./Report");
const { successResponse, errorResponse } = require("../utils/apiResponse");
const { createNotification } = require("../notifications/notificationService");

const submitReport = async (req, res) => {
  try {
    const { targetUser, foundItem, lostItem, reason, details } = req.body;

    if (!reason) return errorResponse(res, 400, "reason is required");
    if (!targetUser && !foundItem && !lostItem) {
      return errorResponse(res, 400, "Report must reference a user, found item, or lost item");
    }

    const report = await Report.create({
      reporter: req.user._id,
      targetUser: targetUser || null,
      foundItem: foundItem || null,
      lostItem: lostItem || null,
      reason,
      details: details || "",
    });

    await createNotification({
      recipient: req.user._id,
      type: "moderation",
      title: "Report submitted",
      message: "Your report was submitted to the moderation team.",
    });

    return successResponse(res, 201, "Report submitted successfully", { report });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const getMyReports = async (req, res) => {
  try {
    const reports = await Report.find({ reporter: req.user._id }).sort({ createdAt: -1 });
    return successResponse(res, 200, "My reports fetched successfully", { reports });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = {
  submitReport,
  getMyReports,
};
