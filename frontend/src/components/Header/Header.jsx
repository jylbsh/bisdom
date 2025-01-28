// src/components/Header.js
import React from 'react';
import './Header.css'; // スタイルファイルのインポート（後で作成します）

import x1 from '../../assets/image/logo.png';
import x2 from '../../assets/image/search-lens.png';
import x3 from '../../assets/image/mixer.png';
import x4 from '../../assets/image/user.png';
import UserAvatar from '../Avatar/Avatar';
const Header = () => {
  return (
    <div className="box">
      <div className="rectangle" />
      <div className="image">
        <img className="element" alt="Element" src={x1} />
      </div>
      <div className = "search">
      <div className = "search-box"/>
        <div className = "search-lens">
          <img className="element" alt="Element" src={x2} />
        </div>
        <div className = "search-mixer">
          <img className="element" alt="Element" src={x3} />
        </div>
      </div>
      <div className='user'><UserAvatar/></div>
    </div>
  );
}

export default Header;
