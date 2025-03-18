import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Delete.css";
import { apiRequest } from "../Request-manage/request";

function Delete() {
  const [message, setMessage] = useState("");
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const fetchData_delete = async (item) => {
    // 確認ポップアップの表示（「はい」→true、「いいえ」→false）
    if (!window.confirm("本当に削除しますか？")) {
      return;
    }
    try {
      const response = await apiRequest.delete(`/knowledge/delete/${item.id}`);
      console.log("Deleted data:", response.data);
      alert(response.data ? JSON.stringify(response.data) : "No data available");
      } catch (error) {
      console.error("Delete error: ", error);
      alert("Error occurred while deleting");
    }
  };

  const fetchMeisaiAll = async () => {
    try {
      const response = await apiRequest.get("/knowledge/get/meisai", { all: true });
      console.log("全件取得結果:", response.data);
      setItems(response.data);
    } catch (error) {
      console.error("全件取得エラー:", error);
      alert("全件取得エラーが発生しました");
    }
  };

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
              <div>{item.title}</div>
            </div>
            <div className="button-container">
              <button
                className="detail-button"
                onClick={() =>
                  navigate("/knowledge/detail", { state: { knowledgeData: item } })
                }
              >
                詳細
              </button>
              <button 
                className="delete-button" 
                onClick={() => fetchData_delete(item)}
              >
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