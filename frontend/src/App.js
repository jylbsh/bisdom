import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // React Router���C���|�[�g
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './components/Home/Home'; // �z�[���y�[�W�R���|�[�l���g

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Header />
        {/* Routes�R���|�[�l���g�Ń��[�e�B���O�ݒ� */}
        <Routes>
          {/* URL�p�X�ɉ����ĕ\������R���|�[�l���g��ݒ� */}
          <Route path="/" element={<Home />} />
          {/* �K�v�ł���Α���Route���ǉ� */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
