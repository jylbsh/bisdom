import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Chatbot.css';
import { apiRequest } from '../Request-manage/request';

function Chatbot() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Handle sending messages
  const handleSendMessage = useCallback(async () => {
    if (!message.trim()) return;  // Ignore empty messages

    // Update chat history with the user's message
    const newHistory = [...chatHistory, { sender: 'user', text: message }];
    setChatHistory(newHistory);
    setLoading(true);  // Set loading state

    // Send the message to the server and get a response
    try {
      const response = await apiRequest.post("/chat", { message, history: newHistory });
      setChatHistory([...newHistory, { sender: 'bot', text: response.data.reply }]);
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
    } catch (error) {
      console.error('Error sending message:', error);
      setChatHistory([...newHistory, { sender: 'bot', text: "Sorry, there was an error." }]);
    } finally {
      setLoading(false);  // Set loading state to false when done
    }

    setMessage("");  // Clear message input
  }, [message, chatHistory]);

  // Handle "Enter" key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  return (
    <div className="chat-container">
      <div className="chat-history" aria-live="polite">
        {chatHistory.map((chat, index) => (
          <div key={index} className={`chat-message ${chat.sender}`}>
            {chat.text.split('\n').map((line, lineIndex) => (
              <span key={lineIndex}>
                {line}
                {lineIndex < chat.text.split('\n').length - 1 && <br />}
              </span>
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
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
        <button onClick={handleSendMessage} className="send-button" disabled={loading}>
          {loading ? 'Typing...' : 'Send'}
        </button>
      </div>
    </div>
  );
}

export default Chatbot;