import React, { useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

import sidebarIcon from '../../assets/image/sidebar.png'; // ハンバーガーボタンの画像
import s1 from '../../assets/image/home.png'; 
import s2 from '../../assets/image/chat.png';
import s3 from '../../assets/image/pencil.png';
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
            <button className='sidebar-button' onClick={() => window.location.href = '/'}>
              <img src={s1} alt="Home Icon" />
            </button>
            {isOpen && <Link to="/">ホーム</Link>}
          </li>
          <li>
            <button className="sidebar-button" onClick={() => window.location.href = '/chat'}>
              <img src={s2} alt="Chat Icon" />
            </button>
            {isOpen && <Link to="/chat">AIチャット</Link>}
          </li>
          <li>
            <button className="sidebar-button" onClick={() => window.location.href = '/knowledge/write'}>
              <img src={s3} alt="Pencil Icon" />
            </button>
            {isOpen && <Link to="/knowledge/write">ナレッジ登録</Link>}
          </li>
          <li>
            {/* <button className="sidebar-button" onClick={() => window.location.href = '/admin'}> */}
            <button 
              className="sidebar-button" 
              onClick={() => {
                alert('準備中: 管理者機能');
                return false;
              }}
            >
              <img src={s4} alt="Admin Icon" />
            </button>
            {/* {isOpen && <Link to="/admin">管理者機能</Link>} */}
            {isOpen && <Link to="/admin" onClick={(e) => {
              e.preventDefault();
              alert('準備中: 管理者機能');
            }}>管理者機能</Link>}
          </li>
          <li>
            <button className="sidebar-button" onClick={() => window.location.href = '/delete'}>
              <img src={s5} alt="Delete Icon" />
            </button>
            {isOpen && <Link to="/delete">投稿削除</Link>}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;