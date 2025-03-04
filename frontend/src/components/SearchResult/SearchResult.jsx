import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchResult.css';

const SearchResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // knowledgeData が配列で渡される前提です
  const data = location.state?.knowledgeData || [];
  console.log('SearchResult:', data);

  const handleItemClick = (item) => {
    // item を knowledgeData として次画面へ渡す
    navigate('/knowledge/detail', { state: { knowledgeData: item } });
  };

  return (
    <div className="search-result-container">
      <h1 className="search-result-title">検索結果一覧</h1>
      {data.length === 0 ? (
        <p className="no-result">検索結果が見つかりませんでした。</p>
      ) : (
        <ul className="result-list">
          {data.map((item, index) => (
            <li
              key={index}
              className="result-item"
              onClick={() => handleItemClick(item)}
              style={{ cursor: 'pointer' }}
            >
              <h2 className="item-title">
                {item.title ? item.title : `Item ${index + 1}`}
              </h2>
              <p className="item-detail">
                {item.detail ? item.detail : '詳細情報なし'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResult;