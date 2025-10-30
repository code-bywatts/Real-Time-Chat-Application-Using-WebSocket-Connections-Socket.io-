import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function Chat() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prevChat) => [...prevChat, data]);
    });

    return () => socket.off("receive_message");
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit("send_message", message);
      setMessage("");
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        {chat.map((msg, index) => (
          <p key={index} style={{ background: "#f0f0f0", padding: "10px", borderRadius: "5px" }}>
            {msg}
          </p>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ padding: "10px", width: "60%" }}
        />
        <button style={{ padding: "10px 20px", marginLeft: "10px" }}>Send</button>
      </form>
    </div>
  );
}

export default Chat;
