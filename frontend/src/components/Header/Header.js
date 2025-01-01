// src/components/Header.js
import React from "react";
import "./Header.css"; // �X�^�C���t�@�C���̃C���|�[�g�i��ō쐬���܂��j

import x1 from "../../assets/image/logo.png";
import x2 from "../../assets/image/search-lens.png";
import x3 from "../../assets/image/mixer.png";
import x4 from "../../assets/image/user.png";

const Header = () => {
  return (
    <div className="box">
      <div className="rectangle" />
      <div className="image">
        <img className="element" alt="Element" src={x1} />
      </div>
      <div className="search">
        <div className="search-box" />
        <div className="search-lens">
          <img className="element" alt="Element" src={x2} />
        </div>
        <div className="search-mixer">
          <img className="element" alt="Element" src={x3} />
        </div>
      </div>
      <div className="user">
        <img className="element" alt="Element" src={x4} />
      </div>
    </div>
  );
};

export default Header;
