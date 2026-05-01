const AuditLog = require("./AuditLog");

const writeAuditLog = async ({ actor, action, entityType, entityId, before = null, after = null, note = "" }) => {
  if (!actor || !action || !entityType || !entityId) return null;

  return AuditLog.create({
    actor,
    action,
    entityType,
    entityId,
    before,
    after,
    note,
  });
};

module.exports = { writeAuditLog };
