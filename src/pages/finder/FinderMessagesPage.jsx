import { useEffect, useState } from "react";
import AppLayout from "../../components/layout/AppLayout";
import { messagesAPI, getStoredUser } from "../../services/api";

export default function FinderMessagesPage() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState("");
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [status, setStatus] = useState("Loading messages...");
  const user = getStoredUser();

  async function loadConversations() {
    try {
      setStatus("Loading messages...");
      const data = await messagesAPI.getConversations();
      const list = data.conversations || [];
      setConversations(list);

      if (list.length > 0) {
        setSelectedConversationId(list[0]._id);
        await loadMessages(list[0]._id);
      } else {
        setStatus("No conversations yet.");
      }
    } catch (error) {
      setStatus(error.message || "Could not load conversations.");
    }
  }

  async function loadMessages(conversationId) {
    try {
      const data = await messagesAPI.getMessages(conversationId);
      setMessages(data.messages || []);
      setStatus("");
    } catch (error) {
      setStatus(error.message || "Could not load messages.");
    }
  }

  async function handleSelectConversation(conversationId) {
    setSelectedConversationId(conversationId);
    await loadMessages(conversationId);
  }

  async function send(e) {
    e.preventDefault();

    if (!text.trim() || !selectedConversationId) return;

    try {
      await messagesAPI.sendMessage(selectedConversationId, text.trim());
      setText("");
      await loadMessages(selectedConversationId);
    } catch (error) {
      setStatus(error.message || "Could not send message.");
    }
  }

  useEffect(() => {
    loadConversations();
  }, []);

  function getConversationLabel(conversation) {
    const otherUser = conversation.participants?.find(
      (participant) => participant._id !== user?._id
    );

    if (otherUser) return `${otherUser.name} (${otherUser.role})`;
    if (conversation.foundItem?.title) return conversation.foundItem.title;
    if (conversation.lostItem?.title) return conversation.lostItem.title;

    return "Conversation";
  }

  return (
    <AppLayout role="finder">
      <section className="page">
        <div className="page-header">
          <div>
            <h1>Messages</h1>
            <p>Secure conversation history between finder and item owner.</p>
          </div>
        </div>

        <div className="grid two">
          <aside className="card">
            <h2>Conversations</h2>

            {conversations.length === 0 && <p className="muted">{status}</p>}

            {conversations.map((conversation) => (
              <button
                key={conversation._id}
                className={
                  selectedConversationId === conversation._id
                    ? "btn btn-primary"
                    : "btn btn-secondary"
                }
                style={{ width: "100%", marginBottom: 8 }}
                onClick={() => handleSelectConversation(conversation._id)}
              >
                {getConversationLabel(conversation)}
              </button>
            ))}
          </aside>

          <div className="card">
            {status && <p className="muted">{status}</p>}

            {!status &&
              messages.map((message) => {
                const senderId =
                  typeof message.sender === "object"
                    ? message.sender._id
                    : message.sender;

                const isMine = senderId === user?._id;

                return (
                  <div
                    key={message._id}
                    className={isMine ? "message-row mine" : "message-row"}
                  >
                    <div className="message-bubble">
                      <strong>
                        {isMine
                          ? "You"
                          : message.sender?.name || "Other user"}
                      </strong>
                      <p>{message.body}</p>
                      <small>
                        {message.createdAt
                          ? new Date(message.createdAt).toLocaleString()
                          : ""}
                      </small>
                    </div>
                  </div>
                );
              })}

            <form className="actions" onSubmit={send}>
              <input
                style={{ flex: 1, minWidth: 220 }}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={
                  selectedConversationId
                    ? "Type your message"
                    : "No conversation selected"
                }
                disabled={!selectedConversationId}
              />

              <button className="btn btn-primary" disabled={!selectedConversationId}>
                Send
              </button>
            </form>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}