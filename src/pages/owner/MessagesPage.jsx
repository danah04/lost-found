import { useState } from "react";
import { mockMessages } from "../../data/mockMessages";

function MessagesPage() {
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState("");

  const handleSend = (e) => {
    e.preventDefault();

    if (!newMessage.trim()) {
      setError("Message cannot be empty.");
      return;
    }

    setError("");
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        sender: "You",
        text: newMessage,
        time: "Now",
      },
    ]);
    setNewMessage("");
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Messages</h1>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "1rem",
          marginBottom: "1rem",
        }}
      >
        {messages.map((message) => (
          <div key={message.id} style={{ marginBottom: "0.75rem" }}>
            <strong>{message.sender}</strong> <span>({message.time})</span>
            <p>{message.text}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend}>
        <textarea
          rows="4"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Write a message..."
          style={{ width: "100%", maxWidth: "500px", padding: "0.5rem" }}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div style={{ marginTop: "0.5rem" }}>
          <button type="submit">Send Message</button>
        </div>
      </form>
    </div>
  );
}

export default MessagesPage;