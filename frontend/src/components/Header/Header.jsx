// src/components/Header.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

import x1 from '../../assets/image/logo.png';
import x2 from '../../assets/image/search-lens.png';
import x3 from '../../assets/image/mixer.png';
import x4 from '../../assets/image/user.png';
import UserAvatar from '../Avatar/Avatar';
import request from '../Request-manage/request';

const Header = () => {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  // 入力ボックスの値が変更されたときに呼ばれるハンドラ
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  // 検索アイコンをクリックしたときにAPIをリクエスト
  const handleSearch = async () => {
    const url = `http://127.0.0.1:8080/knowledge/get/meisai?knowledge_id=${encodeURIComponent(searchText)}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log('検索結果:', data);
      // 取得結果を state に持たせた状態で Knowledge_Detail ルートへ遷移
      navigate('/knowledge/detail', { state: { knowledgeData: data } });
    } catch (error) {
      console.error('検索APIエラー:', error);
    }
  };

  return (
    <div className="box">
      <div className="rectangle" />
      <div className="image">
        <img className="element" alt="Element" src={x1} />
      </div>
      <div className="search">
        <div className="search-box">
          <input 
            type="text"
            placeholder="検索..."
            className="search-input" 
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>
        <div className="search-lens" onClick={handleSearch} style={{ cursor: 'pointer' }}>
          <img className="element" alt="Element" src={x2} />
        </div>
        <div className="search-mixer">
          <img className="element" alt="Element" src={x3} />
        </div>
      </div>
      <div className="user">
        <UserAvatar />
      </div>
    </div>
  );
}

export default Header;
