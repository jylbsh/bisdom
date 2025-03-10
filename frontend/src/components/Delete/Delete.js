import React, { useState, useEffect } from "react"; // useEffect を追加
import "./Delete.css";
import { apiRequest } from "../Request-manage/request";

function Delete() {
  const [message, setMessage] = useState("");
  const [items, setItems] = useState([]); // 初期値を空の配列に変更

  const fetchData_delete = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/delete", {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.text();
      console.log("Deleted data:", data);
      alert(data ? JSON.stringify(data) : "No data available");
    } catch (error) {
      console.error("Delete error: ", error);
      alert("Error occurred while deleting");
    }
  };

  // GETリクエストで全件取得する関数（allフラグ付き）
  const fetchMeisaiAll = async () => {
    try {
      const response = await apiRequest.get("/knowledge/get/meisai", { all: true });
      console.log("全件取得結果:", response.data);
      setItems(response.data); // 取得したデータをitemsに格納
    } catch (error) {
      console.error("全件取得エラー:", error);
      alert("全件取得エラーが発生しました");
    }
  };

  // ページ読み込み時に全件取得を実施
  useEffect(() => {
    fetchMeisaiAll();
  }, []);

  return (
    <>
      <div className="narrage-list">ナレッジリスト</div>
      <div className="delete-container">
        {items.map((item, index) => (
          <div key={index} className="item-row">
            <div className="narrage-title">
              {/* オブジェクトそのままレンダリングするのではなく、必要なプロパティを表示 */}
              <div>{item.title}</div>
            </div>
            <div>
              <button className="detail-button">詳細</button>
              <button className="delete-button" onClick={fetchData_delete}>
                削除
              </button>
            </div>
          </div>
        ))}
      </div>
      {message && <p>{message}</p>}
    </>
  );
}

export default Delete;