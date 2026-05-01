const FoundItem = require("../models/FoundItem");
const { successResponse, errorResponse } = require("../utils/apiResponse");
const validateFields = require("../utils/validateFields");

const getFinderDashboard = async (req, res) => {
  try {
    const finderId = req.user._id;

    const totalFoundItems = await FoundItem.countDocuments({
      finder: finderId,
    });

    const pendingItems = await FoundItem.countDocuments({
      finder: finderId,
      status: "pending",
    });

    const returnedItems = await FoundItem.countDocuments({
      finder: finderId,
      status: "returned",
    });

    const recentItems = await FoundItem.find({
      finder: finderId,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    return successResponse(res, 200, "Finder dashboard fetched successfully", {
      totalFoundItems,
      pendingItems,
      returnedItems,
      recentItems,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const reportFoundItem = async (req, res) => {
  try {
    const requiredFields = ["title", "category", "description", "location"];
    const missingFields = validateFields(req.body, requiredFields);

    if (missingFields.length > 0) {
      return errorResponse(
        res,
        400,
        `Missing fields: ${missingFields.join(", ")}`
      );
    }

    const item = await FoundItem.create({
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      location: req.body.location,
      dateFound: req.body.dateFound || Date.now(),
      image: req.body.image || "",
      finder: req.user._id,
    });

    return successResponse(res, 201, "Found item reported successfully", {
      item,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const getMyFoundItems = async (req, res) => {
  try {
    const items = await FoundItem.find({
      finder: req.user._id,
    }).sort({ createdAt: -1 });

    return successResponse(res, 200, "My found items fetched successfully", {
      items,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const getFoundItemById = async (req, res) => {
  try {
    const item = await FoundItem.findOne({
      _id: req.params.id,
      finder: req.user._id,
    });

    if (!item) {
      return errorResponse(res, 404, "Found item not found");
    }

    return successResponse(res, 200, "Found item fetched successfully", {
      item,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const updateFoundItemStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = ["pending", "matched", "returned", "archived"];

    if (!allowedStatuses.includes(status)) {
      return errorResponse(res, 400, "Invalid status");
    }

    const item = await FoundItem.findOne({
      _id: req.params.id,
      finder: req.user._id,
    });

    if (!item) {
      return errorResponse(res, 404, "Found item not found");
    }

    item.status = status;
    await item.save();

    return successResponse(res, 200, "Found item status updated successfully", {
      item,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const deleteFoundItem = async (req, res) => {
  try {
    const item = await FoundItem.findOneAndDelete({
      _id: req.params.id,
      finder: req.user._id,
    });

    if (!item) {
      return errorResponse(res, 404, "Found item not found");
    }

    return successResponse(res, 200, "Found item deleted successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const getSuggestedMatches = async (req, res) => {
  try {
    return successResponse(res, 200, "Suggested matches fetched successfully", {
      matches: [
        {
          id: "match-1",
          title: "Black Backpack",
          category: "Bags",
          location: "Library",
          matchScore: "85%",
        },
        {
          id: "match-2",
          title: "Student ID Card",
          category: "Cards",
          location: "Cafeteria",
          matchScore: "78%",
        },
        {
          id: "match-3",
          title: "Phone",
          category: "Electronics",
          location: "Main Hall",
          matchScore: "72%",
        },
      ],
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = {
  getFinderDashboard,
  reportFoundItem,
  getMyFoundItems,
  getFoundItemById,
  updateFoundItemStatus,
  deleteFoundItem,
  getSuggestedMatches,
};
