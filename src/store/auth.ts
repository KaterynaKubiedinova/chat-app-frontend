import { createSlice } from '@reduxjs/toolkit';
import { AuthState, UserDTO, UserRegister } from '../types/userTypes';
import { AppDispatch, RootState } from './store';
import api from '../services/services';
import { ApiController } from '../config/apiController.constants';
import { AxiosError } from 'axios';

const initialState: AuthState = {
  user: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    fetchAuthSuccess: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    }
  }
});

export const { fetchAuthSuccess } = authSlice.actions;

export const selectCurrentUser = (state: RootState) => {
  const storedUser = sessionStorage.getItem('user');
  if (storedUser) {
    const user: UserDTO = JSON.parse(storedUser);
    return user;
  } else {
    return state.auth.user;
  }
};

export const loginUser =
  (formData: { email: string; password: string }) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await api.post(ApiController.LOGIN, formData, {
        withCredentials: true
      });
      const { data } = response;

      if (data.accessToken) {
        dispatch(fetchAuthSuccess(data.user));
      }
      sessionStorage.setItem('user', JSON.stringify(data.user));
      sessionStorage.setItem('AccessToken', data.accessToken);

      return data;
    } catch (e) {
      return e as AxiosError;
    }
  };

export const logoutUser = () => async () => {
  const response = await api.get(ApiController.LOGOUT, {
    withCredentials: true
  });

  sessionStorage.clear();
  return response;
};

export const registerUser =
  (formData: UserRegister) => async (dispatch: AppDispatch) => {
    try {
      const response = await api.post(ApiController.REGISTER, formData, {
        withCredentials: true
      });
      const { data } = response;

      if (data.accessToken) {
        dispatch(fetchAuthSuccess(data.user));
      }
      return data;
    } catch (e) {
      return e as AxiosError;
    }
  };

export default authSlice.reducer;
