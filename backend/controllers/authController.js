const jwt = require("jsonwebtoken");
const User = require("../models/User");
const validateRequiredFields = require("../utils/validateFields");
const { successResponse, errorResponse } = require("../utils/apiResponse");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const registerUser = async (req, res) => {
  const missingFields = validateRequiredFields(req.body, [
    "fullName",
    "email",
    "password",
    "role",
  ]);

  if (missingFields.length > 0) {
    return errorResponse(
      res,
      `Missing required fields: ${missingFields.join(", ")}`,
      400
    );
  }

  const { fullName, email, password, role } = req.body;

  const allowedRoles = ["owner", "finder", "moderator"];

  if (!allowedRoles.includes(role)) {
    return errorResponse(res, "Invalid user role", 400);
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return errorResponse(res, "User already exists", 409);
  }

  const user = await User.create({
    fullName,
    email,
    password,
    role,
  });

  return successResponse(
    res,
    "User registered successfully",
    {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    },
    201
  );
};

const loginUser = async (req, res) => {
  const missingFields = validateRequiredFields(req.body, ["email", "password"]);

  if (missingFields.length > 0) {
    return errorResponse(
      res,
      `Missing required fields: ${missingFields.join(", ")}`,
      400
    );
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return errorResponse(res, "Invalid email or password", 401);
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return errorResponse(res, "Invalid email or password", 401);
  }

  return successResponse(res, "Login successful", {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  });
};

const getCurrentUser = async (req, res) => {
  return successResponse(res, "Current user retrieved successfully", req.user);
};

const roleCheck = async (req, res) => {
  return successResponse(res, "Role check successful", {
    role: req.user.role,
    isOwner: req.user.role === "owner",
    isFinder: req.user.role === "finder",
    isModerator: req.user.role === "moderator",
  });
};

const logoutUser = async (req, res) => {
  return successResponse(res, "Logout successful");
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  roleCheck,
  logoutUser,
};
