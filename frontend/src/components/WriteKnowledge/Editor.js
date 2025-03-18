// Editor.js
// Need install 
// - quill, react-quill, quill-image-resize
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';  // 追加
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // QuillのSnowテーマCSSファイル
import ImageResize from 'quill-image-resize';

import './Editor.css';

Quill.register('modules/imageResize', ImageResize);

const Editor = ({ onDataSubmit, initialValue = '' }) => {
  const [value, setValue] = useState(initialValue);
  const location = useLocation();
  const isUpdateMode = location.pathname === '/knowledge/update';

  useEffect(() => {
    // 更新モードで初期値が存在する場合
    if (isUpdateMode && initialValue) {
      setValue(initialValue);
    }
  }, [isUpdateMode, initialValue]);

  const handleChange = (content) => {
    // Editorに入力した値を表示
    setValue(content);
    // 上位コンポーネントに値を渡す
    onDataSubmit(content);
  };

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],

      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],

      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean'],
      ['link', 'image', 'video']
    ],
    imageResize: {}
  };

  return (
    <div>
      <div className='write-knowledge-editorbox-wrap'>
        <ReactQuill
          className='write-knowledge-editorbox'
          value={value}
          placeholder={isUpdateMode ? 'ナレッジを更新...' : 'ナレッジ情報を入力...'}
          onChange={handleChange}
          modules={modules}
        />
      </div>
    </div>
  );
};

export default Editor;