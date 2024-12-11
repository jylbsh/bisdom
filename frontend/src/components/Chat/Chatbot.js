import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css'; // CSSファイルを使用してスタイルを整える場合

function Chatbot() {
  const [message, setMessage] = useState("");  // ユーザーの入力を管理
  const [chatHistory, setChatHistory] = useState([]);  // チャットの履歴を管理
  const messagesEndRef = useRef(null);

  // メッセージ送信時の処理
  const handleSendMessage = async () => {
    if (!message.trim()) return;  // 空のメッセージは送信しない

    // ユーザーのメッセージを履歴に追加
    const newHistory = [...chatHistory, { sender: 'user', text: message }];
    setChatHistory(newHistory);

    // メッセージをバックエンドに送信
    try {
      const response = await fetch('http://localhost:5000/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history: newHistory })
      });
    
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    
      const data = await response.json();
      setChatHistory([...newHistory, { sender: 'bot', text: data.reply }]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setMessage("");  // メッセージをクリア
  };

  // Enterキーで送信する処理
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // チャット履歴が更新されたときに自動スクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  return (
    <div className="chat-container">
      <div className="chat-history">
        {chatHistory.map((chat, index) => (
          <div key={index} className={`chat-message ${chat.sender}`}>
            {chat.text.split('\n').map((line, lineIndex) => (
              <span key={lineIndex}>
                {line}
                {/* 最後の行でない場合は改行 */}
                {lineIndex < chat.text.split('\n').length - 1 && <br />}
              </span>
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* スクロール用の空のdiv */}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="chat-input"
        />
        <button onClick={handleSendMessage} className="send-button">Send</button>
      </div>
    </div>
  );  
}

export default Chatbot;
