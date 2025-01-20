import React, { useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

import sidebarIcon from '../../assets/image/sidebar.png'; // ハンバーガーボタンの画像
import s1 from '../../assets/image/home.png'; 
import s2 from '../../assets/image/chat.png';
import s3 from '../../assets/image/bookmark.png';
import s4 from '../../assets/image/admin.png';
import s5 from '../../assets/image/delete.png';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); // 初期状態は開いている

  // サイドバーの開閉状態を切り替える関数
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* サイドバー */}
      <div className={`sidebar ${isOpen ? '' : 'closed'}`}>
        <ul>
          <li>
            {/* ハンバーガーボタン */}
            <button className="hamburger" onClick={toggleSidebar}>
              <img src={sidebarIcon} alt="Toggle Sidebar" />
              {isOpen}
            </button>
          </li>
          <li>
            <img src={s1} alt="Home Icon" />
            {isOpen && <Link to="/">ホーム</Link>}
          </li>
          <li>
            <img src={s2} alt="Chat Icon" />
            {isOpen && <Link to="/chat">AIチャット</Link>}
          </li>
          <li>
            <img src={s3} alt="Bookmark Icon" />
            {isOpen && <Link to="/favorite">ブックマーク</Link>}
          </li>
          <li>
            <img src={s4} alt="Admin Icon" />
            {isOpen && <Link to="/admin">管理者機能</Link>}
          </li>
          <li>
            <img src={s5} alt="Delete Icon" />
            {isOpen && <Link to="/delete">投稿削除</Link>}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
