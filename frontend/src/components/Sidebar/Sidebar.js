import React from 'react';
import './Sidebar.css';

import sidebar from '../../assets/image/sidebar.png';
import s1 from '../../assets/image/home.png';
import s2 from '../../assets/image/chat.png';
import s3 from '../../assets/image/bookmark.png';

function Sidebar() {
  return (
    <div className="sidebar">
        <img className="hambarger" alt="Element" src={sidebar} />
        <ul>
            <li><img src={s1} alt="home" /><a href="#home">ホーム</a></li>
            <li><img src={s2} alt="chat" /><a href="#chat">AIチャット</a></li>
            <li><img src={s3} alt="bookmark" /><a href="#favorite">ブックマーク</a></li>
            <li><img src={s2} alt="admin" /><a href="#admin">管理者機能</a></li>
        </ul>
    </div>
  );
}

export default Sidebar;
