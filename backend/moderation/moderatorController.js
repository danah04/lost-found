const Item = require("../items/Item");
const Claim = require("../items/Claim");
const FoundItem = require("../models/FoundItem");
const Report = require("./Report");
const AuditLog = require("./AuditLog");
const { successResponse, errorResponse } = require("../utils/apiResponse");
const { writeAuditLog } = require("./auditService");
const { createNotification } = require("../notifications/notificationService");

const getModeratorDashboard = async (req, res) => {
  try {
    const [pendingLostItems, pendingFoundItems, openReports, pendingClaims, recentAuditLogs] = await Promise.all([
      Item.countDocuments({ status: "pending" }),
      FoundItem.countDocuments({ status: "pending" }),
      Report.countDocuments({ status: "open" }),
      Claim.countDocuments({ status: "pending" }),
      AuditLog.find().populate("actor", "name email role").sort({ createdAt: -1 }).limit(10),
    ]);

    return successResponse(res, 200, "Moderator dashboard fetched successfully", {
      stats: { pendingLostItems, pendingFoundItems, openReports, pendingClaims },
      recentAuditLogs,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const getPendingListings = async (req, res) => {
  try {
    const [lostItems, foundItems] = await Promise.all([
      Item.find({ status: "pending" }).populate("owner", "name email role").sort({ createdAt: -1 }),
      FoundItem.find({ status: "pending" }).populate("finder", "name email role").sort({ createdAt: -1 }),
    ]);

    return successResponse(res, 200, "Pending listings fetched successfully", { lostItems, foundItems });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const findListing = async (listingType, listingId) => {
  if (listingType === "lost") return Item.findById(listingId);
  if (listingType === "found") return FoundItem.findById(listingId);
  return null;
};

const getListingOwnerId = (listingType, listing) => {
  if (listingType === "lost") return listing.owner;
  if (listingType === "found") return listing.finder;
  return null;
};

const reviewListing = async (req, res) => {
  try {
    const { listingType, action, reason, note } = req.body;
    const allowedActions = ["approve", "reject", "request_clarification"];

    if (!listingType || !["lost", "found"].includes(listingType)) {
      return errorResponse(res, 400, "listingType must be lost or found");
    }
    if (!allowedActions.includes(action)) return errorResponse(res, 400, "Invalid review action");
    if ((action === "reject" || action === "request_clarification") && !reason && !note) {
      return errorResponse(res, 400, "A reason or note is required");
    }

    const listing = await findListing(listingType, req.params.id);
    if (!listing) return errorResponse(res, 404, "Listing not found");

    const before = listing.toObject();

    if (action === "approve") listing.status = listingType === "lost" ? "active" : "matched";
    if (action === "reject") {
      listing.status = "rejected";
      listing.rejectionReason = reason || note;
    }
    if (action === "request_clarification") {
      listing.status = "needs_update";
      listing.moderatorNote = note || reason;
    }

    await listing.save();

    await writeAuditLog({
      actor: req.user._id,
      action: `listing_${action}`,
      entityType: listingType === "lost" ? "Item" : "FoundItem",
      entityId: listing._id,
      before,
      after: listing.toObject(),
      note: note || reason || "",
    });

    const ownerId = getListingOwnerId(listingType, listing);
    await createNotification({
      recipient: ownerId,
      type: "moderation",
      title: "Listing reviewed",
      message: `Your listing was ${action.replace("_", " ")}.`,
      relatedItem: listingType === "lost" ? listing._id : null,
      relatedFoundItem: listingType === "found" ? listing._id : null,
    });

    return successResponse(res, 200, "Listing reviewed successfully", { listing });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const editListing = async (req, res) => {
  try {
    const { listingType, category, location, description, dateLost, dateFound } = req.body;
    if (!listingType || !["lost", "found"].includes(listingType)) {
      return errorResponse(res, 400, "listingType must be lost or found");
    }

    const listing = await findListing(listingType, req.params.id);
    if (!listing) return errorResponse(res, 404, "Listing not found");

    const before = listing.toObject();
    if (category) listing.category = category;
    if (location) listing.location = location;
    if (description) listing.description = description;
    if (dateLost && listingType === "lost") listing.dateLost = dateLost;
    if (dateFound && listingType === "found") listing.dateFound = dateFound;
    await listing.save();

    await writeAuditLog({
      actor: req.user._id,
      action: "listing_edit",
      entityType: listingType === "lost" ? "Item" : "FoundItem",
      entityId: listing._id,
      before,
      after: listing.toObject(),
    });

    return successResponse(res, 200, "Listing updated successfully", { listing });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const changeListingVisibility = async (req, res) => {
  try {
    const { listingType, action, reason } = req.body;
    const allowedActions = ["archive", "remove"];

    if (!listingType || !["lost", "found"].includes(listingType)) {
      return errorResponse(res, 400, "listingType must be lost or found");
    }
    if (!allowedActions.includes(action)) return errorResponse(res, 400, "action must be archive or remove");
    if (!reason) return errorResponse(res, 400, "reason is required");

    const listing = await findListing(listingType, req.params.id);
    if (!listing) return errorResponse(res, 404, "Listing not found");

    const before = listing.toObject();
    listing.status = action === "archive" ? "archived" : "removed";
    listing.moderatorNote = reason;
    await listing.save();

    await writeAuditLog({
      actor: req.user._id,
      action: `listing_${action}`,
      entityType: listingType === "lost" ? "Item" : "FoundItem",
      entityId: listing._id,
      before,
      after: listing.toObject(),
      note: reason,
    });

    const ownerId = getListingOwnerId(listingType, listing);
    await createNotification({
      recipient: ownerId,
      type: "moderation",
      title: "Listing status changed",
      message: `Your listing was ${action}d. Reason: ${reason}`,
      relatedItem: listingType === "lost" ? listing._id : null,
      relatedFoundItem: listingType === "found" ? listing._id : null,
    });

    return successResponse(res, 200, "Listing status changed successfully", { listing });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const getReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("reporter", "name email role")
      .populate("targetUser", "name email role")
      .populate("foundItem")
      .populate("lostItem")
      .sort({ createdAt: -1 });

    return successResponse(res, 200, "Reports fetched successfully", { reports });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const resolveReport = async (req, res) => {
  try {
    const { status, actionTaken, moderatorNote } = req.body;
    const allowedStatuses = ["resolved", "dismissed"];
    const allowedActions = ["none", "dismissed", "warning", "listing_removed", "user_suspended"];

    if (!allowedStatuses.includes(status)) return errorResponse(res, 400, "Invalid report status");
    if (actionTaken && !allowedActions.includes(actionTaken)) return errorResponse(res, 400, "Invalid action taken");

    const report = await Report.findById(req.params.id);
    if (!report) return errorResponse(res, 404, "Report not found");
    if (report.status !== "open") return errorResponse(res, 409, "Report is already handled");

    const before = report.toObject();
    report.status = status;
    report.actionTaken = actionTaken || (status === "dismissed" ? "dismissed" : "none");
    report.moderatorNote = moderatorNote || "";
    report.resolvedBy = req.user._id;
    report.resolvedAt = new Date();
    await report.save();

    await writeAuditLog({
      actor: req.user._id,
      action: "report_resolve",
      entityType: "Report",
      entityId: report._id,
      before,
      after: report.toObject(),
      note: moderatorNote || "",
    });

    await createNotification({
      recipient: report.reporter,
      type: "moderation",
      title: "Report updated",
      message: "Your report has been reviewed by a moderator.",
    });

    return successResponse(res, 200, "Report resolved successfully", { report });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const getClaimsQueue = async (req, res) => {
  try {
    const claims = await Claim.find({ status: { $in: ["pending", "needs_more_proof"] } })
      .populate("claimant", "name email role")
      .populate({ path: "foundItem", populate: { path: "finder", select: "name email role" } })
      .sort({ createdAt: -1 });

    return successResponse(res, 200, "Claims queue fetched successfully", { claims });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const verifyClaim = async (req, res) => {
  try {
    const { action, moderatorNote } = req.body;
    const allowedActions = ["approve", "reject", "request_more_proof"];

    if (!allowedActions.includes(action)) return errorResponse(res, 400, "Invalid claim action");
    if ((action === "reject" || action === "request_more_proof") && !moderatorNote) {
      return errorResponse(res, 400, "moderatorNote is required");
    }

    const claim = await Claim.findById(req.params.id).populate("foundItem");
    if (!claim) return errorResponse(res, 404, "Claim not found");

    const before = claim.toObject();
    if (action === "approve") claim.status = "approved";
    if (action === "reject") claim.status = "rejected";
    if (action === "request_more_proof") claim.status = "needs_more_proof";
    claim.moderatorNote = moderatorNote || "";
    claim.reviewedBy = req.user._id;
    claim.reviewedAt = new Date();
    await claim.save();

    if (action === "approve" && claim.foundItem) {
      claim.foundItem.status = "matched";
      await claim.foundItem.save();
    }

    await writeAuditLog({
      actor: req.user._id,
      action: `claim_${action}`,
      entityType: "Claim",
      entityId: claim._id,
      before,
      after: claim.toObject(),
      note: moderatorNote || "",
    });

    await createNotification({
      recipient: claim.claimant,
      type: "claim",
      title: "Claim reviewed",
      message: `Your ownership claim was ${action.replace("_", " ")}.`,
      relatedClaim: claim._id,
      relatedFoundItem: claim.foundItem ? claim.foundItem._id : null,
    });

    return successResponse(res, 200, "Claim reviewed successfully", { claim });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const confirmReturn = async (req, res) => {
  try {
    const { method, evidence, note } = req.body;
    if (!method) return errorResponse(res, 400, "return method is required");
    if (!evidence && !note) return errorResponse(res, 400, "evidence or note is required");

    const claim = await Claim.findById(req.params.id).populate("foundItem");
    if (!claim) return errorResponse(res, 404, "Claim not found");
    if (claim.status !== "approved") return errorResponse(res, 400, "Only approved claims can be returned");

    const before = claim.toObject();
    claim.status = "returned";
    claim.moderatorNote = note || `Returned by ${method}`;
    claim.reviewedBy = req.user._id;
    claim.reviewedAt = new Date();
    await claim.save();

    if (claim.foundItem) {
      claim.foundItem.status = "returned";
      await claim.foundItem.save();
    }

    await writeAuditLog({
      actor: req.user._id,
      action: "return_confirm",
      entityType: "Claim",
      entityId: claim._id,
      before,
      after: claim.toObject(),
      note: `${method}: ${evidence || note}`,
    });

    await createNotification({
      recipient: claim.claimant,
      type: "return",
      title: "Item return confirmed",
      message: "A moderator confirmed that the item was returned.",
      relatedClaim: claim._id,
      relatedFoundItem: claim.foundItem ? claim.foundItem._id : null,
    });

    return successResponse(res, 200, "Return confirmed successfully", { claim });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = {
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
};
