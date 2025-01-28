import React, { useState, useEffect } from "react";
import "./DeleteKnowledge.css"; // 外部CSSファイルをインポート

function Home() {
  // 現在選択されているタブを管理
  const [activeTab, setActiveTab] = useState("timeline");
  // messageをuseStateで管理
  const [message, setMessage] = useState("");
  const [items, setItems] = useState([
    "test1",
    "test2",
    "test3",
    "test4",
    "test5",
    "test6",
    "test7",
    "test8",
    "test9",
    "test10",
  ]);

  // タブ切り替え関数
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/", {
        method: "GET",
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
  }, []); // 空の依存配列で初回レンダリング時のみ実行

  return (
    <>
      <div className="narrage-list">ナレッジリスト</div>
      <div className="home-container">
        {items.map((item, index) => (
          <div key={index} className="item-row">
            <div className="tab-content">
              <div>{item}</div>
            </div>
            <div>
              <button class="delete-button">削除</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
