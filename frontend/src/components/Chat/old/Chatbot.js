import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css'; // CSS�t�@�C�����g�p���ăX�^�C���𐮂���ꍇ

function Chatbot() {
  const [message, setMessage] = useState("");  // ���[�U�[�̓��͂��Ǘ�
  const [chatHistory, setChatHistory] = useState([]);  // �`���b�g�̗������Ǘ�
  const messagesEndRef = useRef(null);

  // ���b�Z�[�W���M���̏���
  const handleSendMessage = async () => {
    if (!message.trim()) return;  // ��̃��b�Z�[�W�͑��M���Ȃ�

    // ���[�U�[�̃��b�Z�[�W�𗚗��ɒǉ�
    const newHistory = [...chatHistory, { sender: 'user', text: message }];
    setChatHistory(newHistory);

    // ���b�Z�[�W���o�b�N�G���h�ɑ��M
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

    setMessage("");  // ���b�Z�[�W���N���A
  };

  // Enter�L�[�ő��M���鏈��
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // �`���b�g�������X�V���ꂽ�Ƃ��Ɏ����X�N���[��
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
                {/* �Ō�̍s�łȂ��ꍇ�͉��s */}
                {lineIndex < chat.text.split('\n').length - 1 && <br />}
              </span>
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* �X�N���[���p�̋��div */}
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
