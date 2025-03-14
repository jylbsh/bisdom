import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // React Routerをインポート
import Home from './components/Home/Home'; // ホームページコンポーネント
// import Chat from './components/Chat/Chatbot'; // ホームページコンポーネント
import Chatold from './components/Chat/old/Chat'; // ホームページコンポーネント
import Delete from './components/Delete/Delete';
import KnowledgeDetail from './components/KnowledgeDetail/Knowledge_Detail';
import Login from './components/Login/Login';
import { Layout } from './components/Layout/Layout';
import { AuthProvider } from './components/Auth/AuthContext';
import PrivateRoute from './components/Auth/PrivateRoute';
import WriteKnowledge from './components/WriteKnowledge/WriteKnowledge';
import SearchResult from './components/SearchResult/SearchResult';
import AdminPage from './components/Admin/admin';
import Test from './components/00_Test/Test';
function App() {
  return (
    <AuthProvider>
    <Router>
      <div className="App">
        <Layout />
        {/* Routesコンポーネントでルーティング設定 */}
        <div className="MainContent">
          <Routes>
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            
            {/* チャットUIが安定しないため暫定のものを使用 */}
            {/* <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} /> */}
            <Route path="/chat" element={<PrivateRoute><Chatold /></PrivateRoute>} />

            <Route path="/delete" element={<PrivateRoute><Delete /></PrivateRoute>} />
            <Route path="/knowledge/write" element={<PrivateRoute><WriteKnowledge /></PrivateRoute>} />
            <Route path="/knowledge/update" element={<PrivateRoute><WriteKnowledge /></PrivateRoute>} />
            <Route path="/knowledge/detail" element={<PrivateRoute><KnowledgeDetail /></PrivateRoute>} />
            <Route path="/knowledge/result" element={<PrivateRoute><SearchResult /></PrivateRoute>} />
            <Route path="/admin" element={<PrivateRoute><AdminPage /></PrivateRoute>} />
            <Route path="/login" element={<Login/>}/>
            {/* 以下はテスト用 */}
            <Route path="/test-page" element={<PrivateRoute><Test /></PrivateRoute>} />
          </Routes>
        </div>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
