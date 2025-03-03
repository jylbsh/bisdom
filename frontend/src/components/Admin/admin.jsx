import React, { useState } from "react";
import "./admin.css";

const Admin = () => {
  const [knowledgeItems, setKnowledgeItems] = useState([
    { id: 1, title: "ナレッジ1", content: "内容1" },
    { id: 2, title: "ナレッジ2", content: "内容2" },
    { id: 3, title: "ナレッジ3", content: "内容3" }
  ]);

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>ナレッジ管理システム 管理者ページ</h1>
      </header>
      <div className="admin-container">
        <aside className="admin-sidebar">
          <nav>
            <ul>
              <li><a href="#dashboard">ダッシュボード</a></li>
              <li><a href="#knowledge">ナレッジ一覧</a></li>
              <li><a href="#settings">設定</a></li>
            </ul>
          </nav>
        </aside>
        <main className="admin-content">
          <section id="dashboard">
            <h2>ダッシュボード</h2>
            <p>ここにダッシュボードの内容を表示します。</p>
          </section>
          <section id="knowledge">
            <h2>ナレッジ一覧</h2>
            <table className="knowledge-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>タイトル</th>
                  <th>内容</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {knowledgeItems.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.content}</td>
                    <td>
                      <button>編集</button>
                      <button>削除</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section id="settings">
            <h2>設定</h2>
            <p>システムの設定をここで行います。</p>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Admin;
