import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import "./Knowledge_Detail.css"; // 外部CSSファイルをインポート

function Knowledge_Detail() {
    // 現在選択されているタブを管理
    const [activeTab, setActiveTab] = useState("timeline");
    const [knowledgeData, setKnowledgeData] = useState(null);
    const location = useLocation();

    // タブ切り替え関数
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const fetchKnowledgeData = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8080/knowledge/get/meisai?keyword=1&searchType=id");
            const data = await response.json();
            setKnowledgeData(data);
            console.log(data);
        } catch (error) {
            console.error("Error fetching knowledge data:", error);
        }
    };
    
    useEffect(() => {
        // location.state に渡された knowledgeData があれば、それを利用し、なければAPIリクエストを行う
        if (location.state && location.state.knowledgeData) {
            setKnowledgeData(location.state.knowledgeData);
        } else {
            fetchKnowledgeData();
        }
    }, [location.state]);

    // 知識データがまだない場合は、ローディング中のメッセージを表示
    if (!knowledgeData) {
        return <div>Loading...</div>;
    }

    // fetch("http://127.0.0.1:8080/knowledge/get/meisai?knowledge_id=1");
    const displayData = Array.isArray(knowledgeData) ? knowledgeData[0] : knowledgeData;

    if (!displayData) {
        return <div>データが存在しません</div>;
    }

    // アラート表示関数
    const showAlert = (message) => {
        alert(message);
    };

    return (
        <div className="knowledge-detail">
            <div className="meta-info">
                <table className="title-table">
                    <tbody>
                        <tr>
                            <td><strong>タイトル</strong></td>
                            <td>{displayData.title}</td>
                        </tr>
                    </tbody>
                </table>
                <label className="star-rating">
                    <input type="checkbox" className="star-checkbox" />
                    <span className="star"></span>
                </label>
                <div className="button-container">
                    <button id="updateBtn" className="side-button" onClick={() => showAlert('準備中')}>更新</button>
                    <button id="downloadBtn" className="side-button" onClick={() => showAlert('準備中')}>ダウンロード</button>
                </div>
            </div>
            <div className="info-container">
                <section className="meta-info">
                    <table className="tags-table">
                        <tbody>
                            <tr>
                                <td><strong>タグ</strong></td>
                                <td>{displayData.tags}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <section className="meta-info">
                    <table className="info-table">
                        <tbody>
                            <tr>
                                <td><strong>作成者</strong></td>
                                <td>{displayData.create_by}</td>
                                <td><strong>作成日</strong></td>
                                <td>{displayData.create_at}</td>
                            </tr>
                            <tr>
                                <td><strong>更新者</strong></td>
                                <td>{displayData.update_by}</td>
                                <td><strong>更新日</strong></td>
                                <td>{displayData.update_at}</td>
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
                                <td className="knowledgeDetail-content" dangerouslySetInnerHTML={{ __html: displayData.content }} />
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
                                <td>{displayData.image_path}</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
}

export default Knowledge_Detail;