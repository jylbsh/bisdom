import axios from 'axios';

// API のベースURL（環境変数などで変更可能）
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// axios のインスタンスを作成
const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
});

// リクエストインターセプターで認証トークンを付与
apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// 共通APIリクエスト関数
export const apiRequest = {
    get: (url, params = {}, config = {}) => {
        return apiClient.get(url, { params, ...config });
    },
    post: (url, data, config = {}) => {
        return apiClient.post(url, data, config);
    },
    put: (url, data, config = {}) => {
        return apiClient.put(url, data, config);
    },
    delete: (url, config = {}) => {
        return apiClient.delete(url, config);
    },
};

export default apiRequest;