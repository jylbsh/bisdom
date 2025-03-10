import React, { useState } from 'react';

// EditorコンポーネントとCSSをインポート
import Editor from './Editor';
import './WriteKnowledge.css'

function WriteKnowledge() {
    // フォームの入力値などを管理する状態変数を定義
    const [formData, setFormData] = useState({
        title: '',
        type: '',
        contents: null,
    })

    // 入力フィールドの値が変更されたときに呼ばれるイベントハンドラー
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    // Editorコンポーネントから送られてくるデータを取得するための関数
    const getEditorData = (data) => {
        setFormData((prev) => ({
            ...prev,
            contents: data,
        }));
    }

    // 投稿ボタンがクリックされたときの処理
    const sendData = () => {
        // 現在のformDataの内容をコンソールに出力（実際の送信処理はここに実装）
        console.log(formData);
    }

    return (
        <div>
            {/* アウトライン用ラッパー */}
            <div className='write-knowledge-wrap-outline'>
                <div className='write-knowledge-wrap-inline'>

                    {/* 題目入力欄 */}
                    <div className='write-knowledge-inputspace-wrap'>
                        <div className='write-knowledge-title'>題目</div>
                        <input
                            className='write-knowledge-inputspace'
                            type='text'
                            id='title'
                            name='title'
                            value={null} // 初期値はnull、必要に応じて変更可能
                            onChange={handleChange}
                        />
                    </div>

                    {/* 種類入力欄 */}
                    <div className='write-knowledge-inputspace-wrap'>
                        <div className='write-knowledge-title'>種類</div>
                        <input
                            className='write-knowledge-inputspace'
                            type='text'
                            id='type'
                            name='type'
                            value={null} // 初期値はnull、必要に応じて変更可能
                            onChange={handleChange}
                        />
                    </div>
                    
                    {/* Editorコンポーネントを呼び出し、入力データを受け取る */}
                    <Editor onDataSubmit={getEditorData} />

                    {/* 投稿ボタン */}
                    <button
                        className='write-knowledge-send-button'
                        onClick={() => sendData()}
                    >投稿</button>
                </div>
            </div>
        </div>
    );
}

export default WriteKnowledge;