import React, { useState } from "react";
import apiRequest from "../Request-manage/request";
import "./Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: "ai", content: "こんにちは！どうしましたか？" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    
    // ユーザーメッセージを追加
    const userMessage = { sender: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    
    const currentInput = input;
    setInput("");

    try {
      // /chat エンドポイントに POST リクエストを送信
      const response = await apiRequest.post("/chat", { message: currentInput });
      // レスポンスの内容を AI の回答として設定
      const aiResponse = { sender: "ai", content: response.data.content };
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    } catch (error) {
      console.error("チャットリクエストに失敗しました", error);
      const aiResponse = { sender: "ai", content: "エラーが発生しました。" };
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-interface">
        <div className="chat-window">
          {messages.map((message, index) => (
            // ユーザー側のレイアウト不具合のため、ai側のレイアウトを適用
            <div key={index} className={`chat-message ${message.sender === "user" ? "ai" : "ai"}`}>
              <div className="message-content">{message.content}</div>
            </div>
          ))}
        </div>
        <form className="chat-input-area" onSubmit={handleSend}>
          <input
            type="content"
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
