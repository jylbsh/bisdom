// Editor.js
// Need install 
// - quill, react-quill, quill-image-resize
import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill의 Snow 테마 CSS 파일
import ImageResize from 'quill-image-resize';

import './Editor.css';

Quill.register('modules/imageResize', ImageResize);

const Editor = ({ onDataSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = (content) => {
    // Editor에 입력한 값 표시
    setValue(content);
    // 상위 컴포넌트에 값 전달
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
          placeholder='ナレッジ作成'
          onChange={handleChange}
          modules={modules}
        />
      </div>
    </div>
  );
};

export default Editor;