import React, { useState, useEffect } from "react";
import "./Home.css"; // 外部CSSファイルをインポート

function Home() {
  // 現在選択されているタブを管理
  const [activeTab, setActiveTab] = useState("timeline");
  // messageをuseStateで管理
  const [message, setMessage] = useState(""); 
  const authToken = localStorage.getItem("authToken");
  // タブ切り替え関数
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/", {
        method: 'GET',
        headers:{
          'Authorization':'Bearer ' + authToken,
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

    // レスポンスがJSONである場合
    const data = await response.text();
    console.log("Fetched data:", data); // コンソールにデータを表示
    setMessage(data ? JSON.stringify(data) : "No data available"); // dataが空の場合、デフォルトメッセージを設定
      
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  };

  // コンポーネントがマウントされたときにデータをフェッチする
  useEffect(() => {
    fetchData();
  }, []);  // 空の依存配列で初回レンダリング時のみ実行

  return (
    <div className="home-container">
      {/* タブヘッダー */}
      <div className="tab-header">
        <button
          className={`tab-button ${activeTab === "timeline" ? "active" : ""}`}
          onClick={() => handleTabChange("timeline")}
        >
          タイムライン
        </button>
        <button
          className={`tab-button ${activeTab === "selfPost" ? "active" : ""}`}
          onClick={() => handleTabChange("selfPost")}
        >
          自投稿
        </button>
      </div>

      {/* タブコンテンツ */}
      <div className="tab-content">
        {activeTab === "timeline" && (
          <div>
            <h2>タイムライン</h2>
            <p>ここにタイムラインの内容が表示されます。</p>
            <p>{message}</p> {/* messageを表示 */}
          </div>
        )}
        {activeTab === "selfPost" && (
          <div>
            <h2>自投稿</h2>
            <p>ここに自分の投稿内容が表示されます。</p>
            <p>以下はテスト用のリンク一覧です</p>
            <li><a href="http://localhost:3000/chat">チャット画面</a></li>
            <li><a href="http://localhost:3000/delete">ナレッジ削除画面</a></li>
            <li><a href="http://localhost:3000/knowledge/write">ナレッジ作成画面</a></li>
            <li><a href="http://localhost:3000/knowledge/update">ナレッジ更新画面</a></li>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
