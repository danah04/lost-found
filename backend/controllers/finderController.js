const { successResponse, errorResponse } = require("../utils/apiResponse");
const validateFields = require("../utils/validateFields");

let foundItems = [];

const getFinderDashboard = async (req, res) => {
  return successResponse(res, 200, "Finder dashboard fetched successfully", {
    totalFoundItems: foundItems.length,
    pendingItems: foundItems.filter((item) => item.status === "pending").length,
    returnedItems: foundItems.filter((item) => item.status === "returned").length,
    recentItems: foundItems.slice(-5),
  });
};

const reportFoundItem = async (req, res) => {
  try {
    const requiredFields = ["title", "category", "description", "location"];

    const missingFields = validateFields(req.body, requiredFields);

    if (missingFields.length > 0) {
      return errorResponse(res, 400, `Missing fields: ${missingFields.join(", ")}`);
    }

    const item = {
      id: Date.now().toString(),
      title: req.body.title,
      category: req.body.category,
      description: req.body.description,
      location: req.body.location,
      dateFound: req.body.dateFound || new Date().toISOString(),
      image: req.body.image || "",
      status: "pending",
      finder: req.user
        ? {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
          }
        : null,
      createdAt: new Date().toISOString(),
    };

    foundItems.push(item);

    return successResponse(res, 201, "Found item reported successfully", {
      item,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const getMyFoundItems = async (req, res) => {
  const userId = req.user?._id?.toString();

  const myItems = foundItems.filter(
    (item) => item.finder && item.finder.id.toString() === userId
  );

  return successResponse(res, 200, "My found items fetched successfully", {
    items: myItems,
  });
};

const updateFoundItemStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = ["pending", "matched", "returned", "archived"];

  if (!allowedStatuses.includes(status)) {
    return errorResponse(res, 400, "Invalid status");
  }

  const item = foundItems.find((foundItem) => foundItem.id === id);

  if (!item) {
    return errorResponse(res, 404, "Found item not found");
  }

  item.status = status;
  item.updatedAt = new Date().toISOString();

  return successResponse(res, 200, "Found item status updated successfully", {
    item,
  });
};

const getSuggestedMatches = async (req, res) => {
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
    ],
  });
};

module.exports = {
  getFinderDashboard,
  reportFoundItem,
  getMyFoundItems,
  updateFoundItemStatus,
  getSuggestedMatches,
};
