import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import "./Knowledge_Detail.css";
import apiRequest from '../Request-manage/request'; // apiRequestをインポート

// <2025/03/14 大湯>当画面を再読込時にviewer_countが2度重複する不具合がある。
// ┗不具合解決時に本コメントアウトを削除する。

function Knowledge_Detail() {
    const demoData = {
        id: 'demo-1',
        title: 'デモナレッジ',
        tags: 'デモ, サンプル, テスト',
        create_by: 'デモユーザー',
        create_at: '2025-03-14',
        update_by: 'デモユーザー',
        update_at: '2025-03-14',
        content: '<p>これはデモのナレッジ詳細です。実際のデータが取得できない場合に表示されます。</p>',
        image_path: 'デモの補足情報です'
    };

    const [activeTab, setActiveTab] = useState("timeline");
    const [knowledgeData, setKnowledgeData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [viewCountUpdated, setViewCountUpdated] = useState(false);  // 追加
    const location = useLocation();

    // タブ切り替え関数
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const fetchKnowledgeData = async () => {
        try {
            const response = await apiRequest.get('/knowledge/get/meisai', {
                keyword: '1',
                searchType: 'id'
            });
            setKnowledgeData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching knowledge data:", error);
        }
    };

    // ビューカウントを増やす関数
    const incrementViewCount = async (knowledgeId) => {
        try {
            const response = await apiRequest.put(`/knowledge/viewcount/${knowledgeId}`);
            console.log('ビューカウントを更新しました');
        } catch (error) {
            console.error('Error updating view count:', error);
        }
    };

    useEffect(() => {
        const fetchAndUpdateKnowledge = async () => {
            try {
                let data;
                if (location.state?.knowledgeData) {
                    data = location.state.knowledgeData;
                    setKnowledgeData(data);
                } else {
                    try {
                        const response = await apiRequest.get('/knowledge/get/meisai', {
                            keyword: '1',
                            searchType: 'id'
                        });
                        data = response.data;
                        setKnowledgeData(data);
                    } catch (error) {
                        console.log('APIからのデータ取得に失敗しました。デモデータを使用します。');
                        data = demoData;
                        setKnowledgeData(data);
                    }
                }

                // ビューカウントの更新は実データの場合のみ行う
                if (!viewCountUpdated && data && data.id !== 'demo-1') {
                    const id = Array.isArray(data) ? data[0]?.id : data.id;
                    if (id) {
                        await incrementViewCount(id);
                        setViewCountUpdated(true);
                    }
                }
            } catch (error) {
                console.error("Error:", error);
                // エラー時もデモデータを表示
                setKnowledgeData(demoData);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAndUpdateKnowledge();
    }, [location.state]); 

    // 知識データがまだない場合は、ローディング中のメッセージを表示
    if (isLoading) {
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