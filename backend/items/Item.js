const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: 120,
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
      maxlength: 1500,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    dateLost: {
      type: Date,
      required: [true, "Date lost is required"],
    },
    image: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "active", "needs_update", "rejected", "matched", "verified", "returned", "archived", "removed"],
      default: "pending",
    },
    type: {
      type: String,
      enum: ["lost"],
      default: "lost",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    moderatorNote: {
      type: String,
      default: "",
    },
    rejectionReason: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

itemSchema.index({ title: "text", description: "text", category: "text", location: "text" });
itemSchema.index({ owner: 1, status: 1 });
itemSchema.index({ category: 1, location: 1, dateLost: -1 });

module.exports = mongoose.model("Item", itemSchema);
