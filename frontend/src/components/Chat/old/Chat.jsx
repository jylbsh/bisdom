import React, { useState } from "react";
import apiRequest from "../../Request-manage/request";
import "./Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "こんにちは！どうしましたか？" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    
    // ユーザーメッセージを追加
    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    
    const currentInput = input;
    setInput("");

    try {
      // /chat エンドポイントに POST リクエストを送信（history情報も渡す）
      const response = await apiRequest.post("/chat", { message: currentInput, history: newMessages });
      // レスポンスの内容を AI の回答として設定
      const assistantResponse = { role: "assistant", content: response.data.content };
      setMessages((prevMessages) => [...prevMessages, assistantResponse]);
    } catch (error) {
      console.error("チャットリクエストに失敗しました", error);
      const assistantResponse = { role: "assistant", content: "エラーが発生しました。" };
      setMessages((prevMessages) => [...prevMessages, assistantResponse]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-interface">
        <div className="chat-window">
          {messages.map((message, index) => (
            // ロールに応じたレイアウトを適用
            <div key={index} className={`chat-message ${message.role === "user" ? "assistant" : "assistant"}`}>
              <div className="message-content">{message.content}</div>
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
