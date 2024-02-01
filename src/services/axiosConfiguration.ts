import axios from 'axios';
import { ApiController } from '../config/apiController.constants';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

api.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem('AccessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const statusError = error.response?.status;

    if (statusError === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await api.get(ApiController.REFRESH, {
          withCredentials: true
        });
        const { accessToken } = response.data;

        sessionStorage.setItem('AccessToken', accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (error) {
        sessionStorage.clear();
        await api.get(ApiController.LOGOUT, { withCredentials: true });
      }
    }

    return Promise.reject(error);
  }
);

export default api;
