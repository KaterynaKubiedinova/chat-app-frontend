import { UserRegister } from './../types/userTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import api from './axiosConfiguration';
import { ApiController } from '../config/apiController.constants';
import { AxiosError } from 'axios';
import { Chat } from '../types/chatTypes';

export const postAuthUser = createAsyncThunk(
  'user/authRequestStatus',
  async (formData: { email: string; password: string }) => {
    try {
      const storedUser = sessionStorage.getItem('user');

      if (storedUser) {
        const user = JSON.parse(storedUser);
        return user;
      } else {
        sessionStorage.clear();
        const response = await api.post(ApiController.LOGIN, formData, {
          withCredentials: true
        });

        const { data } = response;

        if (data.accessToken) {
          sessionStorage.setItem('user', JSON.stringify(data.user));
          sessionStorage.setItem('AccessToken', data.accessToken);
        }
        return data.user;
      }
    } catch (e) {
      return e as AxiosError;
    }
  }
);

export const getLogoutUser = createAsyncThunk(
  'user/logoutRequestStatus',
  async () => {
    try {
      const response = await api.get(ApiController.LOGOUT, {
        withCredentials: true
      });

      const { data } = response;

      sessionStorage.clear();
      return data;
    } catch (e) {
      return e as AxiosError;
    }
  }
);

export const postRegisteredUser = createAsyncThunk(
  'user/registerRequestStatus',
  async (formData: UserRegister) => {
    try {
      const response = await api.post(ApiController.REGISTER, formData, {
        withCredentials: true
      });
      const { data } = response;

      if (data.accessToken) {
        sessionStorage.setItem('user', JSON.stringify(data.user));
        sessionStorage.setItem('AccessToken', data.accessToken);
      }
      return data;
    } catch (e) {
      return e as AxiosError;
    }
  }
);

export const getUserByID = createAsyncThunk(
  'user/fetchUserRequestStatus',
  async (id: string) => {
    try {
      const response = await api.get(ApiController.FETCH_USER, {
        params: { id }
      });

      const { data } = response;

      return data.user;
    } catch (e) {
      return e as AxiosError;
    }
  }
);

export const createNewChat = createAsyncThunk(
  'chat/createRequestStatus',
  async (formData: Chat) => {
    try {
      const response = await api.post(ApiController.CREATE_CHAT, formData);
      const { data } = response;

      return data;
    } catch (e) {
      return e as AxiosError;
    }
  }
);

export const getChatsForUser = createAsyncThunk(
  'chat/allUserChatsRequestStatus',
  async (email: string) => {
    try {
      const response = await api.get(ApiController.ALL_USER_CHATS, {
        params: { email }
      });
      const { data } = response;

      return data.chats;
    } catch (e) {
      return e as AxiosError;
    }
  }
);

export const getCurrentUserChat = createAsyncThunk(
  'chat/currentUserChatRequestStatus',
  async (chatName: string) => {
    try {
      const response = await api.get(ApiController.CURRENT_USER_CHAT, {
        params: { chatName }
      });
      const { data } = response;

      return data.chat;
    } catch (e) {
      return e as AxiosError;
    }
  }
);

export const deleteChatById = createAsyncThunk(
  'chat/deleteChatRequestStatus',
  async (id: string) => {
    try {
      await api.delete(ApiController.DELETE_CHAT_BY_ID, { params: { id } });
    } catch (e) {
      return e;
    }
  }
);
