const mongoose = require("mongoose");

const foundItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },

    dateFound: {
      type: Date,
      default: Date.now,
    },

    image: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "matched", "returned", "archived"],
      default: "pending",
    },

    finder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FoundItem", foundItemSchema);
