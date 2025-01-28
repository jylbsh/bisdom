// AuthContext.js
import React, { createContext, useContext, useState,useMemo,useEffect } from "react";
import PropTypes from "prop-types";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    // ここで非同期の認証チェックを行う
    const checkAuthStatus = async () => {
      // 実際の認証状態を取得する処理（例: ローカルストレージやAPIから取得）
      const authStatus = await getAuthStatusFromAPI();
      setIsAuthenticated(authStatus);
      setLoading(false); // 認証情報が取得できたらローディングを終了
    };

    checkAuthStatus();
  }, []);
  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true"); // ログイン時にlocalStorageに設定
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated","false"); // ログアウト時にlocalStorageから削除
  };
  const value = useMemo(() => ({ isAuthenticated, login, logout }), [
    isAuthenticated,
  ]);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
async function getAuthStatusFromAPI() {
    return localStorage.getItem("isAuthenticated") === "true"; // 仮の例
}
export const useAuth = () => useContext(AuthContext);
