import React, { useState } from "react";
import "./Delete.css"; // 外部CSSファイルをインポート
import { apiRequest } from "../Request-manage/request";

function Delete() {
  const [message, setMessage] = useState("");
  const [meisaiData, setMeisaiData] = useState(null);

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
      setMessage(data ? JSON.stringify(data) : "No data available");
    } catch (error) {
      console.error("Delete error: ", error);
      setMessage("Error occurred while deleting");
    }
  };

  // GETリクエストで全件取得する関数（allフラグ付き）
  const fetchMeisaiAll = async () => {
    try {
      const response = await apiRequest.get("/knowledge/get/meisai", { all: true });
      console.log("全件取得結果:", response.data);
      setMeisaiData(response.data);
      setMessage("全件取得に成功しました");
    } catch (error) {
      console.error("全件取得エラー:", error);
      setMessage("全件取得エラーが発生しました");
    }
  };

  const [items] = useState([
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

  return (
    <>
      <div className="narrage-list">ナレッジリスト</div>
      <div className="delete-container">
        {items.map((item, index) => (
          <div key={index} className="item-row">
            <div className="narrage-title">
              <div>{item}</div>
            </div>
            <div>
              <button
                className="detail-button"
                /* onClick={fetchData_detail} */
              >
                詳細
              </button>
              <button
                className="delete-button"
                onClick={fetchData_delete}
              >
                削除
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>
        <button onClick={fetchMeisaiAll}>全件取得 (get-meisai)</button>
      </div>
      {message && <p>{message}</p>}
      {meisaiData && (
        <div className="meisai-data">
          <pre>{JSON.stringify(meisaiData, null, 2)}</pre>
        </div>
      )}
    </>
  );
}

export default Delete;