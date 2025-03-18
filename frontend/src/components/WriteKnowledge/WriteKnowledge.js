import React, { useState, useEffect, useRef } from 'react';  // useRefを追加
import { useLocation, useNavigate } from 'react-router-dom';
import Editor from './Editor';
import './WriteKnowledge.css';
import { apiRequest } from '../Request-manage/request';

function WriteKnowledge() {
    const location = useLocation();
    const navigate = useNavigate();
    const isUpdateMode = location.pathname === '/knowledge/update';

    const [formData, setFormData] = useState({
        title: '',
        tag: '',
        contents: '',
        image_path: ''
    });

    const containerRef = useRef(null);

    useEffect(() => {
        const measureHeight = () => {
            if (containerRef.current) {
                const height = containerRef.current.offsetHeight;
                console.log('コンテナの高さ:', height);
            }
        };

        measureHeight();
        window.addEventListener('resize', measureHeight);

        return () => {
            window.removeEventListener('resize', measureHeight);
        };
    }, []);

    // 更新モードの場合、初期データをセット
    useEffect(() => {
        if (isUpdateMode && location.state?.knowledgeData) {
            const data = location.state.knowledgeData;
            setFormData({
                title: data.title || '',
                tag: data.tags || '',
                contents: data.content || '',
                image_path: data.image_path || ''
            });
        }
    }, [isUpdateMode, location.state]);

    // 入力フィールドの値が変更されたときのハンドラー
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Editorから送られてくるデータを取得
    const getEditorData = (data) => {
        setFormData((prev) => ({
            ...prev,
            contents: data,
        }));
    };

    // 送信処理を更新
    const sendData = async () => {
        try {
            // バリデーションチェック
            if (!formData.title || !formData.tag || !formData.contents) {
                alert('すべての項目を入力してください。');
                return;
            }

            const jsonData = JSON.stringify({
                // 更新モードの場合は、IDも含める
                ...(isUpdateMode && { id: location.state?.knowledgeData?.id }),
                title: formData.title,
                tags: formData.tag,
                contents: formData.contents,
                image_path: formData.image_path
            });

            // 更新モードの場合はPUTメソッドを使用
            const endpoint = isUpdateMode ? '/modify-knowledge' : '/add-knowledge';
            const method = isUpdateMode ? 'put' : 'post';
            
            const response = await apiRequest[method](endpoint, jsonData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                alert(isUpdateMode ? 'ナレッジを更新しました。' : 'ナレッジを投稿しました。');
            }
        } catch (error) {
            console.error(isUpdateMode ? '更新エラー:' : '投稿エラー:', error);
            alert(isUpdateMode ? '更新に失敗しました。' : '投稿に失敗しました。');
        }
    };

    // テキストエリアの高さ自動調整関数
    const adjustHeight = (element) => {
        element.style.height = 'auto';
        element.style.height = `${element.scrollHeight}px`;
    };

    // テキストエリアの変更ハンドラー
    const handleTextAreaChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        adjustHeight(event.target);
    };

    return (
        <div ref={containerRef}>
            <div className='write-knowledge-wrap-outline'>
                <div className='write-knowledge-wrap-inline'>
                    <h2>{isUpdateMode ? 'ナレッジ更新' : 'ナレッジ投稿'}</h2>
                    <div className='write-knowledge-inputspace-wrap'>
                        <div className='write-knowledge-title'>タイトル</div>
                        <input
                            className='write-knowledge-inputspace'
                            type='text'
                            id='title'
                            name='title'
                            value={formData.title}
                            onChange={handleChange}
                            placeholder='タイトルを入力...'
                        />
                    </div>

                    <div className='write-knowledge-inputspace-wrap'>
                        <div className='write-knowledge-title'>  分類 　</div>
                        <input
                            className='write-knowledge-inputspace'
                            type='text'
                            id='tag'
                            name='tag'
                            value={formData.tag}
                            onChange={handleChange}
                            placeholder='ナレッジ分類を入力...'
                        />
                    </div>
                    
                    <div className='write-knowledge-inputspace-wrap'>
                        <div className='write-knowledge-title'>補足情報</div>
                        <textarea
                            className='write-knowledge-textarea'
                            id='image_path'
                            name='image_path'
                            value={formData.image_path}
                            onChange={handleTextAreaChange}
                            onFocus={(e) => adjustHeight(e.target)}
                            placeholder='（任意）関連URLや画像パス等を入力（改行で複数入力可能）...'
                            rows={1}
                        />
                    </div>
                    
                    <Editor 
                        onDataSubmit={getEditorData} 
                        initialValue={formData.contents}  // 初期値を渡す
                    />

                    <button
                        className='write-knowledge-send-button'
                        onClick={sendData}
                    >
                        {isUpdateMode ? '更新' : '投稿'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default WriteKnowledge;