const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { successResponse, errorResponse } = require("../utils/apiResponse");
const validateFields = require("../utils/validateFields");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const missingFields = validateFields(req.body, ["name", "email", "password"]);

    if (missingFields.length > 0) {
      return errorResponse(res, 400, `Missing fields: ${missingFields.join(", ")}`);
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return errorResponse(res, 400, "User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || "owner",
    });

    return successResponse(
      res,
      201,
      "User registered successfully",
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token: generateToken(user._id),
      }
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const missingFields = validateFields(req.body, ["email", "password"]);

    if (missingFields.length > 0) {
      return errorResponse(res, 400, `Missing fields: ${missingFields.join(", ")}`);
    }

    const user = await User.findOne({ email });

    if (!user) {
      return errorResponse(res, 401, "Invalid email or password");
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return errorResponse(res, 401, "Invalid email or password");
    }

    return successResponse(
      res,
      200,
      "Login successful",
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token: generateToken(user._id),
      }
    );
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const getCurrentUser = async (req, res) => {
  return successResponse(res, 200, "Current user fetched successfully", {
    user: req.user,
  });
};

const roleCheck = async (req, res) => {
  return successResponse(res, 200, "Role checked successfully", {
    role: req.user.role,
  });
};

const logoutUser = async (req, res) => {
  return successResponse(res, 200, "Logout successful");
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  roleCheck,
  logoutUser,
};