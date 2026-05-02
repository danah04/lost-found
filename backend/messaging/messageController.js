const Conversation = require("./Conversation");
const User = require("../models/User");
const { successResponse, errorResponse } = require("../utils/apiResponse");
const { createNotification } = require("../notifications/notificationService");

const createOrGetConversation = async (req, res) => {
  try {
    const { participantId, foundItem, lostItem } = req.body;

    if (!participantId) return errorResponse(res, 400, "participantId is required");
    if (String(participantId) === String(req.user._id)) {
      return errorResponse(res, 400, "You cannot create a conversation with yourself");
    }

    const participant = await User.findById(participantId);
    if (!participant) return errorResponse(res, 404, "Participant not found");

    let conversation = await Conversation.findOne({
      participants: { $all: [req.user._id, participantId] },
      ...(foundItem ? { foundItem } : {}),
      ...(lostItem ? { lostItem } : {}),
    })
      .populate("participants", "name email role")
      .populate("foundItem")
      .populate("lostItem");

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [req.user._id, participantId],
        foundItem: foundItem || null,
        lostItem: lostItem || null,
      });
      conversation = await conversation.populate("participants", "name email role");
    }

    return successResponse(res, 200, "Conversation ready", { conversation });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const getMyConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({ participants: req.user._id })
      .populate("participants", "name email role")
      .populate("foundItem")
      .populate("lostItem")
      .sort({ lastMessageAt: -1 });

    return successResponse(res, 200, "Conversations fetched successfully", { conversations });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const getConversationMessages = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      _id: req.params.conversationId,
      participants: req.user._id,
    }).populate("messages.sender", "name email role");

    if (!conversation) return errorResponse(res, 404, "Conversation not found");

    conversation.messages.forEach((message) => {
      if (!message.readBy.some((id) => String(id) === String(req.user._id))) {
        message.readBy.push(req.user._id);
      }
    });
    await conversation.save();

    return successResponse(res, 200, "Messages fetched successfully", {
      messages: conversation.messages,
      conversation,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

const sendMessage = async (req, res) => {
  try {
    const { body } = req.body;

    if (!body || !body.trim()) return errorResponse(res, 400, "Message cannot be empty");

    const conversation = await Conversation.findOne({
      _id: req.params.conversationId,
      participants: req.user._id,
    });

    if (!conversation) return errorResponse(res, 404, "Conversation not found");

    const message = {
      sender: req.user._id,
      body: body.trim(),
      readBy: [req.user._id],
    };

    conversation.messages.push(message);
    conversation.lastMessageAt = new Date();
    await conversation.save();

    const recipientIds = conversation.participants.filter((participant) => String(participant) !== String(req.user._id));
    await Promise.all(
      recipientIds.map((recipient) =>
        createNotification({
          recipient,
          type: "message",
          title: "New message",
          message: `${req.user.name} sent you a message.`,
          relatedConversation: conversation._id,
          relatedFoundItem: conversation.foundItem,
          relatedItem: conversation.lostItem,
        })
      )
    );

    const savedMessage = conversation.messages[conversation.messages.length - 1];
    return successResponse(res, 201, "Message sent successfully", { message: savedMessage });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

module.exports = {
  createOrGetConversation,
  getMyConversations,
  getConversationMessages,
  sendMessage,
};
