import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // React Routerをインポート
import Home from './components/Home/Home'; // ホームページコンポーネント
import Chat from './components/Chat/Chat'; // ホームページコンポーネント
import Delete from './components/Delete/Delete';
import KnowledgeDetail from './components/KnowledgeDetail/Knowledge_Detail';
import Login from './components/Login/Login';
import { Layout } from './components/Layout/Layout';
import { AuthProvider } from './components/Auth/AuthContext';
import PrivateRoute from './components/Auth/PrivateRoute';
import WriteKnowledge from './components/WriteKnowledge/WriteKnowledge';
import SearchResult from './components/SearchResult/SearchResult';
import AdminPage from './components/Admin/admin';
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
            <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
            <Route path="/delete" element={<PrivateRoute><Delete /></PrivateRoute>} />
            <Route path="/knowledge/write" element={<PrivateRoute><WriteKnowledge /></PrivateRoute>} />
            <Route path="/knowledge/update" element={<PrivateRoute><WriteKnowledge /></PrivateRoute>} />
            <Route path="/knowledge/detail" element={<PrivateRoute><KnowledgeDetail /></PrivateRoute>} />
            <Route path="/knowledge/result" element={<PrivateRoute><SearchResult /></PrivateRoute>} />
            <Route path="/admin" element={<PrivateRoute><AdminPage /></PrivateRoute>} />
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </div>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
