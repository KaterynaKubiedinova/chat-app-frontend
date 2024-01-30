import { createSlice } from '@reduxjs/toolkit';
import { Chat, ChatState } from '../types/chatTypes';
import { AppDispatch, RootState } from './store';
import { AxiosError } from 'axios';
import { ApiController } from '../config/apiController.constants';
import api from '../services/services';

const initialState: ChatState = {
  currentChat: null,
  chats: []
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentChat: (store, { payload }) => {
      store.currentChat = payload;
    },
    getUserChats: (state, action) => {
      state.chats = action.payload;
    }
  }
});

export const { setCurrentChat, getUserChats } = chatSlice.actions;

export const selectCurrentChat = (state: RootState) => state.chat.currentChat;
export const selectAllChats = (state: RootState) => state.chat.chats;

export const createNewChat =
  (formData: Chat) => async (dispatch: AppDispatch) => {
    try {
      const response = await api.post(ApiController.CREATE_CHAT, formData);
      const { data } = response;

      if (data) {
        dispatch(getUserChats(data.userChats));
      }
      return data;
    } catch (e) {
      return e as AxiosError;
    }
  };

export const getAllChatsForUser =
  (email: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await api.get(ApiController.ALL_USER_CHATS, {
        params: { email }
      });
      const { data } = response;

      if (data) dispatch(getUserChats(data));

      return data;
    } catch (e) {
      return e as AxiosError;
    }
  };

export const getCurrentUserChat =
  (chatName: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await api.get(ApiController.CURRENT_USER_CHAT, {
        params: { chatName }
      });
      const { data } = response;

      if (data) dispatch(setCurrentChat(data));
    } catch (e) {
      return e as AxiosError;
    }
  };

export const deleteChatById = (id: string) => async () => {
  try {
    await api.delete(ApiController.DELETE_CHAT_BY_ID, { params: { id } });
  } catch (e) {
    return e;
  }
};

export default chatSlice.reducer;
