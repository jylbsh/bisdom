import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { apiRequest } from "../Request-manage/request"; // ここでapiRequestをインポート

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
  const login = (token) => {
    setIsAuthenticated(true);
    localStorage.setItem("authToken", token); // ログイン時にトークンをlocalStorageに設定
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("authToken"); // ログアウト時にトークンをlocalStorageから削除
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
  const token = localStorage.getItem("authToken");
  if (!token) {
    return false;
  } 

  try {
    const response = await apiRequest.get("/api/auth/check");
    console.log(response);
    return true;
  } catch (error) {
    console.error("Error checking auth status:", error);
    return false;
  }
}

export const useAuth = () => useContext(AuthContext);
