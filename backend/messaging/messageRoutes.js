const express = require("express");
const {
  createOrGetConversation,
  getMyConversations,
  getConversationMessages,
  sendMessage,
} = require("./messageController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);
router.post("/conversations", createOrGetConversation);
router.get("/conversations", getMyConversations);
router.get("/conversations/:conversationId", getConversationMessages);
router.post("/conversations/:conversationId", sendMessage);

module.exports = router;
