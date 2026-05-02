const Notification = require("./Notification");

const createNotification = async ({
  recipient,
  type = "system",
  title,
  message,
  relatedItem = null,
  relatedFoundItem = null,
  relatedClaim = null,
  relatedConversation = null,
}) => {
  if (!recipient || !title || !message) return null;

  return Notification.create({
    recipient,
    type,
    title,
    message,
    relatedItem,
    relatedFoundItem,
    relatedClaim,
    relatedConversation,
  });
};

const createNotifications = async (notifications = []) => {
  const validNotifications = notifications.filter((item) => item.recipient && item.title && item.message);
  if (!validNotifications.length) return [];
  return Notification.insertMany(validNotifications);
};

module.exports = {
  createNotification,
  createNotifications,
};
