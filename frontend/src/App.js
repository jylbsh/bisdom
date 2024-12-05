import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // React Routerをインポート
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './components/Home/Home'; // ホームページコンポーネント
import Chat from './components/Chat/Chat'; // ホームページコンポーネント

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Header />
        {/* Routesコンポーネントでルーティング設定 */}
        <div className="MainContent">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
