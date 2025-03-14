import React, { useState } from 'react';

// EditorコンポーネントとCSSをインポート
import Editor from './Editor';
import './WriteKnowledge.css';
import { apiRequest } from '../Request-manage/request';  // APIリクエスト用のモジュールをインポート

function WriteKnowledge() {
    // フォームの入力値を管理する状態変数を定義
    const [formData, setFormData] = useState({
        title: '',
        tag: '',
        contents: '',
        image_path: ''
    });

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

    // 投稿ボタンクリック時の処理
    const sendData = async () => {
        try {
            // バリデーションチェック
            if (!formData.title || !formData.tag || !formData.contents) {
                alert('すべての項目を入力してください。');
                return;
            }

            // 送信データをJSON形式で作成
            const jsonData = JSON.stringify({
                title: formData.title,
                tags: formData.tag,
                contents: formData.contents,
                image_path: formData.image_path
            });

            // APIリクエストを送信（JSONヘッダー付き）
            const response = await apiRequest.post('/add-knowledge', jsonData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                alert('ナレッジを投稿しました。');
                // フォームをクリア
                setFormData({
                    title: '',
                    tag: '',
                    contents: '',
                    image_path: ''
                });
            }
        } catch (error) {
            console.error('投稿エラー:', error);
            alert('投稿に失敗しました。');
        }
    };

    return (
        <div>
            {/* アウトライン用ラッパー */}
            <div className='write-knowledge-wrap-outline'>
                <div className='write-knowledge-wrap-inline'>

                    {/* 題目入力欄 */}
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

                    {/* 種類入力欄 */}
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
                    
                    {/* 画像パス入力欄を追加 */}
                    <div className='write-knowledge-inputspace-wrap'>
                        <div className='write-knowledge-title'>補足情報</div>
                        <input
                            className='write-knowledge-inputspace'
                            type='text'
                            id='image_path'
                            name='image_path'
                            value={formData.image_path}
                            onChange={handleChange}
                            placeholder='（任意）関連URLや画像パス等を入力...'
                        />
                    </div>
                    
                    {/* Editorコンポーネントを呼び出し、入力データを受け取る */}
                    <Editor onDataSubmit={getEditorData} />

                    {/* 投稿ボタン */}
                    <button
                        className='write-knowledge-send-button'
                        onClick={sendData}
                    >投稿</button>
                </div>
            </div>
        </div>
    );
}

export default WriteKnowledge;