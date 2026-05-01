const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema(
  {
    foundItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoundItem",
      required: true,
    },
    claimant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    verificationDetails: {
      type: String,
      required: [true, "Verification details are required"],
      trim: true,
      maxlength: 1500,
    },
    evidence: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "needs_more_proof", "returned"],
      default: "pending",
    },
    moderatorNote: {
      type: String,
      default: "",
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    reviewedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

claimSchema.index({ foundItem: 1, claimant: 1 }, { unique: true });
claimSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model("Claim", claimSchema);
