import axios from 'axios';
import { BASE_URL } from '../config/app-constants';
import { ApiController } from '../config/apiController.constants';

const api = axios.create({
  baseURL: BASE_URL,
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

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const currentRefreshToken = sessionStorage.getItem('RefreshToken');
        const response = await axios.post(ApiController.refresh, { currentRefreshToken });
        const { accessToken, refreshToken } = response.data;

				sessionStorage.setItem('AccessToken', accessToken);
				sessionStorage.setItem('RefreshToken', refreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axios(originalRequest);
			} catch (error) {
				await axios.get(ApiController.logout);
      }
    }

    return Promise.reject(error);
  }
);

export default api
