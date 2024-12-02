import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // React Routerをインポート
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './components/Home/Home'; // ホームページコンポーネント

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Header />
        {/* Routesコンポーネントでルーティング設定 */}
        <Routes>
          {/* URLパスに応じて表示するコンポーネントを設定 */}
          <Route path="/" element={<Home />} />
          {/* 必要であれば他のRouteも追加 */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
