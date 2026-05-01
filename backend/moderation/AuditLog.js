const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      required: true,
      trim: true,
    },
    entityType: {
      type: String,
      required: true,
      trim: true,
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    before: {
      type: Object,
      default: null,
    },
    after: {
      type: Object,
      default: null,
    },
    note: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

auditLogSchema.index({ actor: 1, createdAt: -1 });
auditLogSchema.index({ entityType: 1, entityId: 1 });

module.exports = mongoose.model("AuditLog", auditLogSchema);
