import React, { useState, useEffect } from "react";
import "./Knowledge_Detail.css"; // 外部CSSファイルをインポート

function Knowledge_Detail() {
    // 現在選択されているタブを管理
    const [activeTab, setActiveTab] = useState("timeline");
    const [knowledgeData, setKnowledgeData] = useState(null);

    // タブ切り替え関数
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const fetchKnowledgeData = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8080/knowledge/get/meisai?knowledge_id=1");
            const data = await response.json();
            setKnowledgeData(data);
            console.log(data);
        } catch (error) {
            console.error("Error fetching knowledge data:", error);
        }
    };
    
    useEffect(() => {
        // データを取得する関数
        fetchKnowledgeData();
    }, []);

    // 知識データがまだない場合は、ローディング中のメッセージを表示
    if (!knowledgeData) {
        return <div>Loading...</div>;
    }

    // fetch("http://127.0.0.1:8080/knowledge/get/meisai?knowledge_id=1");

    //バック側の実装の段階で削除して、DBのデータを取ってこれるように書き換えを行う。

    return(
        <div className="knowledge-detail">
            <div className="meta-info">
                <table className="title-table">
                    <tbody>
                        <tr>
                            <td><strong>タイトル</strong></td>
                            <td>{knowledgeData[0].title}</td>
                        </tr>
                    </tbody>
                </table>
                <label class="star-rating">
                    <input type="checkbox" class="star-checkbox" />
                    <span class="star"></span>
                </label>
                <div class="button-container">
                    <button id="updateBtn" class="side-button">更新</button>
                    <button id="downloadBtn" class="side-button">ダウンロード</button>
                </div>
            </div>
            <div className="info-container">
                <section className="meta-info">
                    <table className="tags-table">
                        <tbody>
                            <tr>
                                <td><strong>タグ</strong></td>
                                <td>{knowledgeData[0].tags}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <section className="meta-info">
                    <table className="info-table">
                        <tbody>
                            <tr>
                                <td><strong>作成者</strong></td>
                                <td>{knowledgeData[0].create_by}</td>
                                <td><strong>作成日</strong></td>
                                <td>{knowledgeData[0].create_at}</td>
                            </tr>
                            <tr>
                                <td><strong>更新者</strong></td>
                                <td>{knowledgeData[0].update_by}</td>
                                <td><strong>更新日</strong></td>
                                <td>{knowledgeData[0].update_at}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
            <div className="meta-info">
                <section className="knowledge-detail">
                    <table className="knowledgeDetail-table">
                        <tbody>
                            <tr>
                                <td><strong>ナレッジ詳細</strong></td>
                                <td>{knowledgeData[0].content}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
            <div className="KnowledgeDetail-info">
                <section className="knowledge-detail">
                    <table className="knowledgeDetail-table">
                        <tbody>
                            <tr>
                                <td><strong>補足情報</strong></td>
                                <td>{knowledgeData[0].image_path}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
}

export default Knowledge_Detail;