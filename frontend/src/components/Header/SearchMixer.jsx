import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../Request-manage/request';
import './SearchMixer.css';

const SearchMixer = ({ visible, onClose }) => {
  const [keyword, setKeyword] = useState('');
  const [searchType, setSearchType] = useState('id');
  const [fuzzySearch, setFuzzySearch] = useState(false);
  const [selfPost, setSelfPost] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const navigate = useNavigate();

  if (!visible) return null;

  // オーバーレイ部分がクリックされたときに onClose を呼び出す
  const handleOverlayClick = () => {
    onClose();
  };

  // モーダル部分のクリックはイベント伝播を止める
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleRadioChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (name === 'fuzzySearch') {
      setFuzzySearch(checked);
    } else if (name === 'selfPost') {
      setSelfPost(checked);
    } else if (name === 'favorite') {
      setFavorite(checked);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const params = {
      keyword,
      searchType,
      fuzzy: fuzzySearch ? 'true' : undefined,
      selfPost: selfPost ? 'true' : undefined,
      favorite: favorite ? 'true' : undefined,
    };

    try {
      const response = await apiRequest.get('/knowledge/get/meisai', params);
      const data = response.data;

      // エラーの場合はアラートで表示
      if (response.status !== 200) {
        alert(`エラー: ${data.error}`);
        return;
      }

      console.log('検索結果:', data);
      // 検索結果を state に持たせた状態で SearchResult ルートへ遷移
      navigate('/knowledge/result', { state: { knowledgeData: data } });
      onClose();
    } catch (error) {
      console.error('検索APIエラー:', error);
      alert('検索APIエラーが発生しました');
    }
  };

  return (
    <div className="search-mixer-overlay" onClick={handleOverlayClick}>
      <div className="search-mixer-modal" onClick={handleModalClick}>
        <h2>詳細検索</h2>
        <form onSubmit={handleSubmit}>
          <div className="search-input-group">
            <label htmlFor="mixer-keyword">キーワード:</label>
            <input
              id="mixer-keyword"
              type="text"
              placeholder="キーワードを入力"
              value={keyword}
              onChange={handleKeywordChange}
            />
          </div>
          <fieldset className="search-type-group">
            <legend>検索種別</legend>
            <label>
              <input
                type="radio"
                name="searchType"
                value="id"
                checked={searchType === 'id'}
                onChange={handleRadioChange}
              />
              ID
            </label>
            <label>
              <input
                type="radio"
                name="searchType"
                value="title"
                checked={searchType === 'title'}
                onChange={handleRadioChange}
              />
              タイトル
            </label>
            <label>
              <input
                type="radio"
                name="searchType"
                value="tag"
                checked={searchType === 'tag'}
                onChange={handleRadioChange}
              />
              タグ
            </label>
          </fieldset>
          <div className="search-options">
            <label>
              <input
                type="checkbox"
                name="fuzzySearch"
                checked={fuzzySearch}
                onChange={handleCheckboxChange}
              />
              あいまい検索
            </label>
            <label>
              <input
                type="checkbox"
                name="selfPost"
                checked={selfPost}
                onChange={handleCheckboxChange}
              />
              自投稿
            </label>
            <label>
              <input
                type="checkbox"
                name="favorite"
                checked={favorite}
                onChange={handleCheckboxChange}
              />
              お気に入り
            </label>
          </div>
          <div className="form-actions">
            <button type="submit">検索</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchMixer;