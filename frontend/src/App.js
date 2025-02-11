import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // React Routerをインポート
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './components/Home/Home'; // ホームページコンポーネント
import Chat from './components/Chat/Chat'; // ホームページコンポーネント
import Delete from './components/Delete/Delete';

import Login from './components/Login/Login';
import { Layout } from './components/Layout/Layout';
import { AuthProvider } from './components/Auth/AuthContext';
import PrivateRoute from './components/Auth/PrivateRoute';
function App() {
  return (
    <AuthProvider>
    <Router>
      <div className="App">
        <Layout />
        {/* Routesコンポーネントでルーティング設定 */}
        <div className="MainContent">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/deleteknowledge" element={<DeleteKnowledge />} />
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/delete" element={<Delete />} />
          </Routes>
        </div>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
