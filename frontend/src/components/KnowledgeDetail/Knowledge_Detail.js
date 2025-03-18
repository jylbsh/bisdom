import React, { useState, useEffect, useRef } from "react"; // useRefを追加
import { useLocation, useNavigate } from 'react-router-dom';  // useNavigateを追加
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
    const navigate = useNavigate();  // 追加
    const containerRef = useRef(null);

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

    useEffect(() => {
        const measureHeight = () => {
            if (containerRef.current) {
                // コンテナの高さを計測
                const height = containerRef.current.offsetHeight;
                console.log('コンテナの全体高さ:', height);

                // ビューポートの高さを取得
                const viewportHeight = window.innerHeight;
                console.log('ビューポートの高さ:', viewportHeight);

                // スクロール可能な高さを計算
                const scrollHeight = containerRef.current.scrollHeight;
                console.log('スクロール可能な高さ:', scrollHeight);
            }
        };

        measureHeight();
        
        // リサイズ時にも高さを再計測
        window.addEventListener('resize', measureHeight);
        
        return () => {
            window.removeEventListener('resize', measureHeight);
        };
    }, [knowledgeData]); // knowledgeDataが更新されたときにも再計測

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

    // 更新ボタンのハンドラを追加
    const handleUpdate = () => {
        if (!displayData) {
            alert('更新するデータがありません。');
            return;
        }

        if (displayData.id === 'demo-1') {
            alert('デモデータは更新できません。');
            return;
        }

        // /knowledge/updateに画面のデータを渡しながら遷移
        navigate('/knowledge/update', {
            state: {
                knowledgeData: displayData
            }
        });
    };

    // URLをハイパーリンクに変換し、改行で区切られた複数の情報を処理する関数
    const convertUrlToLink = (text) => {
        if (!text) return '';
        
        // 改行で分割
        const lines = text.split('\n');
        
        // 各行を処理
        return lines.map((line, lineIndex) => {
            // URLを検出する正規表現
            const urlRegex = /(https?:\/\/[^\s]+)/g;
            
            // 各行のURLをリンクに変換
            const processedLine = line.split(urlRegex).map((part, partIndex) => {
                if (part.match(urlRegex)) {
                    return (
                        <a 
                            key={`${lineIndex}-${partIndex}`}
                            href={part}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {part}
                        </a>
                    );
                }
                return part;
            });

            // 各行を div で囲んで返す
            return (
                <div key={lineIndex} className="supplementary-info-line">
                    {processedLine}
                </div>
            );
        });
    };

    return (
        <div ref={containerRef} className="knowledge-detail-container">
            <div className="knowledge-detail-inner">
                {/* タイトルセクション */}
                <div className="meta-info">
                    <div className="title-section">
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
                    </div>
                    <div className="button-container">
                        <button className="side-button" onClick={handleUpdate}>更新</button>
                        <button className="side-button" onClick={() => showAlert('準備中')}>ダウンロード</button>
                    </div>
                </div>

                {/* 情報セクション */}
                <div className="info-container">
                    <section className="knowledge-detail-section">
                        <table className="tags-table">
                            <tbody>
                                <tr>
                                    <td><strong>タグ</strong></td>
                                    <td>{displayData.tags}</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                    <section className="knowledge-detail-section">
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
                <div className="KnowledgeDetail-info">
                    <section className="knowledge-detail-section">
                        <table className="knowledgeDetail-table">
                            <tbody>
                                <tr>
                                    <td><strong>補足情報</strong></td>
                                    <td>{convertUrlToLink(displayData.image_path)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                </div>
                <div className="KnowledgeDetail-info">
                    <section className="knowledge-detail-section">
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
            </div>
        </div>
    );
}

export default Knowledge_Detail;