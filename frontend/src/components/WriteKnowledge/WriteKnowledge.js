import React, { useState } from 'react';

import Editor from './Editor';
import './WriteKnowledge.css'

function WriteKnowledge() {
    // 값 저장할 객체 변수 선언
    const [formData, setFormData] = useState({
        title: '',
        type: '',
        contents: null,
    })

    // input 입력 값 취득 핸들러
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    // Editor 컴포넌트 입력 데이터 취득
    const getEditorData = (data) => {
        setFormData((prev) => ({
            ...prev,
            contents: data,
        }));
    }
    // 투고 버튼 클릭시 이벤트
    const sendData = () => {
        // 전송 처리
        console.log(formData);
    }

    return (
        <div>
            <div className='write-knowledge-wrap-outline'>
                <div className='write-knowledge-wrap-inline'>

                    <div className='write-knowledge-inputspace-wrap'>
                        <div className='write-knowledge-title'>題目</div>
                        <input
                            className='write-knowledge-inputspace'
                            type='text' id='title'
                            name='title'
                            value={null}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='write-knowledge-inputspace-wrap'>
                        <div className='write-knowledge-title'>種類</div>
                        <input
                            className='write-knowledge-inputspace'
                            type='text'
                            id='type'
                            name='type'
                            value={null}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <Editor onDataSubmit={getEditorData} />

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