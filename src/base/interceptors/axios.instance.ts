import { API_URL } from '@constants/env';
import axios, { AxiosError } from 'axios';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let isRefreshing = false;
let pendingRequests: ((token: string) => void)[] = [];

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError & { config: any }) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          pendingRequests.push((token) => {
            original.headers.Authorization = `Bearer ${token}`;
            resolve(axiosInstance(original));
          });
        });
      }
      original._retry = true;
      isRefreshing = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          // No refresh token, clear auth and redirect to login
          localStorage.clear();
          window.location.href = '/login';
          return Promise.reject(new Error('No refresh token available'));
        }

        const response = await axios.post(
          `${API_URL}/access/refresh-token`,
          { refreshToken },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (response.status === 200 && response.data?.data) {
          const { accessToken, refreshToken: newRefreshToken } = response.data.data;

          // Save new tokens
          localStorage.setItem('accessToken', accessToken);
          if (newRefreshToken) {
            localStorage.setItem('refreshToken', newRefreshToken);
          }

          // Retry pending requests
          pendingRequests.forEach((cb) => cb(accessToken));
          pendingRequests = [];

          original.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(original);
        }
      } catch (error) {
        // Refresh failed, clear auth and redirect to login
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
