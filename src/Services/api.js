import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach Token to Authorization header
// The token is hidden from the user and automatically sent with all API requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ═══════════════════════════════════════════════════════════════════════════════
// PARENT AUTHENTICATION
// ═══════════════════════════════════════════════════════════════════════════════

export const parentAuthService = {
  login: async (contact, password) => {
    const response = await api.post('login/', { contact, password });
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('register/', userData);
    return response.data;
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// STAFF/TEACHER AUTHENTICATION
// ═══════════════════════════════════════════════════════════════════════════════

export const staffAuthService = {
  login: async (contact, password) => {
    const response = await api.post('staff/login/', { contact, password });
    return response.data;
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// ADMIN AUTHENTICATION
// ═══════════════════════════════════════════════════════════════════════════════

export const adminAuthService = {
  login: async (username, password) => {
    const response = await api.post('admin/login/', { username, password });
    return response.data;
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// PARENT PORTAL SERVICES
// ═══════════════════════════════════════════════════════════════════════════════

export const dashboardService = {
  getDashboardData: async (studentId = '') => {
    const url = studentId ? `parent/dashboard/?student_id=${studentId}` : 'parent/dashboard/';
    const response = await api.get(url);
    return response.data;
  },
};

export const requestsService = {
  getRequests: async () => {
    const response = await api.get('parent/requests/');
    return response.data;
  },
  createRequest: async (requestData) => {
    const response = await api.post('parent/requests/', requestData);
    return response.data;
  },
  replyToRequest: async (requestId, message) => {
    const response = await api.post(`parent/requests/${requestId}/reply/`, { message });
    return response.data;
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// TOKEN MANAGEMENT
// ═══════════════════════════════════════════════════════════════════════════════

export const tokenService = {
  /**
   * Save token to localStorage (called after successful login)
   * Token is hidden from user and auto-included in all API requests
   */
  saveToken: (token) => {
    if (token) {
      localStorage.setItem('token', token);
    }
  },

  /**
   * Retrieve token from localStorage
   */
  getToken: () => {
    return localStorage.getItem('token');
  },

  /**
   * Clear token from localStorage (called on logout)
   */
  clearToken: () => {
    localStorage.removeItem('token');
  },

  /**
   * Check if user is authenticated (token exists)
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export default api;
