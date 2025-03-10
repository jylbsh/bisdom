import React, { useState } from "react";
import "./Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "こんにちは！どうしましたか？" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    
    const userMessage = { sender: "user", text:input };
    setMessages([...messages, userMessage]);
    setInput("");
    
    setTimeout(() => {
      const aiResponse = { sender: "ai", text:"あなたのメッセージを受け取りました。" };
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    }, 1000);
  };

  return (
    <div className="chat-container">
      <div className="chat-interface">
        <div className="chat-window">
          {messages.map((message, index) => (
            // user側のレイアウトが不具合を起こすため、ai側のレイアウトをコピーしてuser側にも適用
            // <div key={index} className={`chat-message ${message.sender === "user" ? "user" : "ai"}`}>
            <div key={index} className={`chat-message ${message.sender === "user" ? "ai" : "ai"}`}>
            {/* // <div key={index} className={`chat-message ${message.sender}`}> */}
            <div className="message-text">{message.text}</div>
            </div>
          ))}
        </div>
        <form className="chat-input-area" onSubmit={handleSend}>
          <input
            type="text"
            placeholder="メッセージを入力してください..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">送信</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
