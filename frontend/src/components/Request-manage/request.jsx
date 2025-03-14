import axios from 'axios';

// API �̃x�[�XURL�i���ϐ��ȂǂŕύX�\�j
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// axios �̃C���X�^���X���쐬
const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 100000,
});

// ���N�G�X�g�C���^�[�Z�v�^�[�ŔF�؃g�[�N����t�^
apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// ���X�|���X�C���^�[�Z�v�^�[�ŃG���[���e��alert�ŕ\��
apiClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.data && error.response.data.error) {
            alert(error.response.data.error);
        }
        return Promise.reject(error);
    }
);

// ����API���N�G�X�g�֐�
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