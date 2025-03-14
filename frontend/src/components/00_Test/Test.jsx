import React, { useState } from 'react';
import { apiRequest } from '../Request-manage/request';

const Test = () => {
  const [title, setTitle] = useState("テスト題目");
  const [contents, setContents] = useState("<p>これはテストです。</p>");
  const [authorId, setAuthorId] = useState("test_author");
  const [imagePath, setImagePath] = useState(""); // 新しいステートを追加

  const handleSendRequest = async () => {
    try {
      const response = await apiRequest.post('/add-knowledge', {
        title: title,
        contents: contents,
        author_id: authorId,
        image_path: imagePath // リクエストに image_path を追加
      });
      console.log("Response:", response.data);
      alert("Response: " + JSON.stringify(response.data));
    } catch (error) {
      console.error("Error:", error);
      alert("Error: " + error);
    }
  };

  return (
    <div>
      <h2>テストリクエスト送信 (apiRequest 使用)</h2>
      <div>
        <label>
          Title:
          <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Contents:
          <textarea 
            value={contents}
            onChange={(e) => setContents(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Author ID:
          <input 
            type="text"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Image Path:
          <input 
            type="text"
            value={imagePath}
            onChange={(e) => setImagePath(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleSendRequest}>リクエスト送信</button>
    </div>
  );
};

export default Test;