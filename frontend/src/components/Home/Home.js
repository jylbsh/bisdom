import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';  // 追加
import "./Home.css";
import apiRequest from "../Request-manage/request";

function Home() {
  const navigate = useNavigate();  // 追加
  // 現在選択されているタブを管理
  const [activeTab, setActiveTab] = useState("timeline");
  // messageをuseStateで管理
  const [message, setMessage] = useState(""); 
  const [knowledgeData, setKnowledgeData] = useState([]);
  const authToken = localStorage.getItem("authToken");
  // タブ切り替え関数
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // dummy data
  const dummy_data = [
    {
      id: 1,
      userName: "ユーザー1",
      timestamp: "2025-03-11 20:41",
      title: "タイトル1",
      tab: "タブ1",
      likes: 10,
    },
    {
      id: 2,
      userName: "ユーザー2",
      timestamp: "2025-03-11 21:00",
      title: "タイトル2",
      tab: "タブ2",
      likes: 20,
    },
    {
      id: 2,
      userName: "ユーザー2",
      timestamp: "2025-03-11 21:00",
      title: "タイトル2",
      tab: "タブ2",
      likes: 20,
    },
  ];
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

  const fetchKnowledgeData = async () => {
    try {
      const response = await apiRequest.get('/knowledge/get/meisai', {
        all: true
      });
      
      // viewer_count順にソートして上位5件を取得
      const sortedData = response.data
        .sort((a, b) => b.viewer_count - a.viewer_count)
        .slice(0, 5);
      
      setKnowledgeData(sortedData);
    } catch (error) {
      console.error("Error fetching knowledge data:", error);
    }
  };

  const fetchSelfPostData = async () => {
    try {
      const response = await apiRequest.get('/knowledge/get/meisai', {
        selfPost: true
      });
      
      setKnowledgeData(response.data);
    } catch (error) {
      console.error("Error fetching self post data:", error);
    }
  };

  // コンポーネントがマウントされたときにデータをフェッチする
  useEffect(() => {
    fetchData();
  }, []);  // 空の依存配列で初回レンダリング時のみ実行

  useEffect(() => {
    if (activeTab === "timeline") {
      fetchKnowledgeData();
    } else if (activeTab === "selfPost") {
      fetchSelfPostData();
    }
  }, [activeTab]);

  // ナレッジ詳細画面への遷移関数を追加
  const handleKnowledgeClick = (knowledge) => {
    navigate('/knowledge/detail', { 
      state: { knowledgeData: knowledge } 
    });
  };

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
            {knowledgeData.map((knowledge) => (
              <div 
                key={knowledge.id} 
                className="tab-content-wrap"
                onClick={() => handleKnowledgeClick(knowledge)}
                style={{ cursor: 'pointer' }}  // カーソルをポインターに
              >
                <div className="content-static-info">
                  <p>タイトル: {knowledge.title}</p>
                  <p>作成者: {knowledge.create_by}</p>
                  <p>作成日時: {knowledge.create_at}</p>
                  <p>閲覧数: {knowledge.viewer_count}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === "selfPost" && (
          <div>
            {knowledgeData.map((knowledge) => (
              <div 
                key={knowledge.id} 
                className="tab-content-wrap"
                onClick={() => handleKnowledgeClick(knowledge)}
                style={{ cursor: 'pointer' }}  // カーソルをポインターに
              >
                <div className="content-static-info">
                  <p>タイトル: {knowledge.title}</p>
                  <p>作成者: {knowledge.create_by}</p>
                  <p>作成日時: {knowledge.create_at}</p>
                  <p>閲覧数: {knowledge.viewer_count}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
