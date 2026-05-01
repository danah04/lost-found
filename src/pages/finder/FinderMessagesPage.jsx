import { useState } from "react";
import AppLayout from "../../components/layout/AppLayout";

const seedMessages = [
  {
    id: "m1",
    sender: "System",
    text: "Messages backend is not connected yet.",
    time: "Now",
  },
];

export default function FinderMessagesPage() {
  const [msgs, setMsgs] = useState(seedMessages);
  const [text, setText] = useState("");

  function send(e) {
    e.preventDefault();

    if (!text.trim()) return;

    setMsgs((currentMessages) => [
      ...currentMessages,
      {
        id: crypto.randomUUID(),
        sender: "You",
        text: text.trim(),
        time: "Now",
      },
    ]);

    setText("");
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

        <div className="card">
          {msgs.map((message) => (
            <div
              key={message.id}
              className={
                message.sender === "You" ? "message-row mine" : "message-row"
              }
            >
              <div className="message-bubble">
                <strong>{message.sender}</strong>
                <p>{message.text}</p>
                <small>{message.time}</small>
              </div>
            </div>
          ))}

          <form className="actions" onSubmit={send}>
            <input
              style={{ flex: 1, minWidth: 220 }}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your message"
            />

            <button className="btn btn-primary">Send</button>
          </form>
        </div>
      </section>
    </AppLayout>
  );
}
