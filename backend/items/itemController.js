const Item = require("./Item");
const Claim = require("./Claim");
const FoundItem = require("../models/FoundItem");
const { successResponse, errorResponse } = require("../utils/apiResponse");
const { validateLostItemPayload, validateClaimPayload } = require("./itemValidator");
const { getSuggestedFoundMatches, getSuggestedLostMatches } = require("./matchService");
const { createNotification } = require("../notifications/notificationService");

const reportLostItem = async (req, res) => {
  try {
    const errors = validateLostItemPayload(req.body);
    if (errors.length) return errorResponse(res, 400, errors.join(", "));

    const item = await Item.create({
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      location: req.body.location,
      dateLost: req.body.dateLost,
      image: req.body.image || "",
      owner: req.user._id,
    });

    await createNotification({
      recipient: req.user._id,
      type: "listing",
      title: "Lost item submitted",
      message: "Your lost item report was submitted and is pending review.",
      relatedItem: item._id,
    });

    return successResponse(res, 201, "Lost item reported successfully", { item });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const getMyLostItems = async (req, res) => {
  try {
    const items = await Item.find({ owner: req.user._id }).sort({ createdAt: -1 });
    return successResponse(res, 200, "My lost items fetched successfully", { items });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const browseFoundItems = async (req, res) => {
  try {
    const { keyword, category, location, status, dateFrom, dateTo } = req.query;
    const query = {};

    if (keyword) query.$text = { $search: keyword };
    if (category) query.category = category;
    if (location) query.location = new RegExp(location, "i");
    if (status) query.status = status;
    if (dateFrom || dateTo) {
      query.dateFound = {};
      if (dateFrom) query.dateFound.$gte = new Date(dateFrom);
      if (dateTo) query.dateFound.$lte = new Date(dateTo);
    }

    const items = await FoundItem.find(query).sort({ createdAt: -1 });
    return successResponse(res, 200, "Found items fetched successfully", { items });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const getFoundItemDetails = async (req, res) => {
  try {
    const item = await FoundItem.findById(req.params.id).populate("finder", "name email role");
    if (!item) return errorResponse(res, 404, "Found item not found");

    const matches = await getSuggestedLostMatches(item._id);
    return successResponse(res, 200, "Found item details fetched successfully", { item, matches });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const submitClaim = async (req, res) => {
  try {
    const errors = validateClaimPayload(req.body);
    if (errors.length) return errorResponse(res, 400, errors.join(", "));

    const foundItem = await FoundItem.findById(req.params.id);
    if (!foundItem) return errorResponse(res, 404, "Found item not found");

    const existingClaim = await Claim.findOne({ foundItem: foundItem._id, claimant: req.user._id });
    if (existingClaim) return errorResponse(res, 409, "You already submitted a claim for this item");

    const claim = await Claim.create({
      foundItem: foundItem._id,
      claimant: req.user._id,
      verificationDetails: req.body.verificationDetails,
      evidence: req.body.evidence || "",
    });

    foundItem.status = "matched";
    await foundItem.save();

    await createNotification({
      recipient: foundItem.finder,
      type: "claim",
      title: "New ownership claim",
      message: "Someone submitted a claim for one of your found items.",
      relatedFoundItem: foundItem._id,
      relatedClaim: claim._id,
    });

    return successResponse(res, 201, "Claim submitted successfully", { claim });
  } catch (error) {
    if (error.code === 11000) return errorResponse(res, 409, "Duplicate claim is not allowed");
    return errorResponse(res, 500, error.message);
  }
};

const getMyClaims = async (req, res) => {
  try {
    const claims = await Claim.find({ claimant: req.user._id })
      .populate("foundItem")
      .sort({ createdAt: -1 });

    return successResponse(res, 200, "My claims fetched successfully", { claims });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const getSuggestedMatchesForLostItem = async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id, owner: req.user._id });
    if (!item) return errorResponse(res, 404, "Lost item not found");

    const matches = await getSuggestedFoundMatches(item._id);
    return successResponse(res, 200, "Suggested matches fetched successfully", { matches });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = {
  reportLostItem,
  getMyLostItems,
  browseFoundItems,
  getFoundItemDetails,
  submitClaim,
  getMyClaims,
  getSuggestedMatchesForLostItem,
};
