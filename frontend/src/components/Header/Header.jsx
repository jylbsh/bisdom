import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

import x1 from '../../assets/image/logo.png';
import x2 from '../../assets/image/search-lens.png';
import x3 from '../../assets/image/mixer.png';
import x4 from '../../assets/image/user.png';
import UserAvatar from '../Avatar/Avatar';
import { apiRequest } from '../Request-manage/request';
import SearchMixer from './SearchMixer';

const Header = () => {
  const [searchText, setSearchText] = useState('');
  const [showFlow, setShowFlow] = useState(false); // ポップアップ表示用 state
  const navigate = useNavigate();

  // エンターキー押下時のハンドラを追加
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 入力ボックスの値が変更されたときに呼ばれるハンドラ
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  // 検索アイコンをクリックしたときにAPIをリクエスト
  const handleSearch = async () => {
    try {
      const params = { keyword: searchText, searchType: 'title' ,fuzzy: 'true'};
      const response = await apiRequest.get('/knowledge/get/meisai', params);
      const data = response.data;
      console.log('検索結果:', data);

      // エラーの場合はアラートで表示
      if (response.status !== 200) {
        alert(`エラー: ${data.error}`);
        return;
      }
      // 取得結果を state に持たせた状態で KnowledgeResult ルートへ遷移
      navigate('/knowledge/result', { state: { knowledgeData: data } });
    } catch (error) {
      console.error('検索APIエラー:', error);
      alert('検索APIエラーが発生しました');
    }
  };

  // search-mixer をクリックしたときのハンドラ（ポップアップの表示切替）
  const handleFlowToggle = () => {
    setShowFlow(!showFlow);
  };

  return (
    <div className="box">
      <div className="rectangle" />
      <div className="image">
        <img 
          className="element" 
          alt="Element" 
          src={x1} 
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}  // マウスカーソルをポインターに変更
        />
      </div>
      {/* search-wrapper を追加 */}
      <div className="search-wrapper" style={{ position: 'relative' }}>
        <div className="search">
          <div className="search-box">
            <input 
              type="text"
              placeholder="検索..."
              className="search-input" 
              value={searchText}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}  // エンターキーイベントを追加
            />
          </div>
          <div className="search-lens" onClick={handleSearch} style={{ cursor: 'pointer' }}>
            <img className="element" alt="Element" src={x2} />
          </div>
          <div 
            className="search-mixer" 
            onClick={handleFlowToggle} 
            style={{ cursor: 'pointer' }}
          >
            <img className="element" alt="Element" src={x3} />
          </div>
        </div>
        {/* SearchMixer を検索バー直下に配置 */}
        <SearchMixer visible={showFlow} onClose={() => setShowFlow(false)} />
      </div>
      <div className="user">
        <UserAvatar />
      </div>
    </div>
  );
};

export default Header;