import { createSlice } from '@reduxjs/toolkit';
import { ChatState } from '../types/chatTypes';
import { RootState } from './store';
import {
  createNewChat,
  getChatsForUser,
  getCurrentUserChat
} from '../services/services';

const initialState: ChatState = {
  currentChat: null,
  chats: []
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    getUserChats: (state, action) => {
      const chats = action.payload;
      state.chats = chats;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewChat.fulfilled, (state, { payload }) => {
        state.chats = payload;
      })
      .addCase(getChatsForUser.fulfilled, (state, { payload }) => {
        state.chats = payload;
      })
      .addCase(getCurrentUserChat.fulfilled, (state, { payload }) => {
        state.currentChat = payload;
      });
  }
});

export const { getUserChats } = chatSlice.actions;

export const selectCurrentChat = (state: RootState) => state.chat.currentChat;
export const selectAllChats = (state: RootState) => state.chat.chats;

export default chatSlice.reducer;
