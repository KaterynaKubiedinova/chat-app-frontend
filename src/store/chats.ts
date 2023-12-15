import { createSlice } from "@reduxjs/toolkit"
import { Chat, ChatState } from "../types/chat-types"
import { AppDispatch, RootState } from "./store";
import { AxiosError } from "axios";
import { ApiController } from "../config/apiController.constants";
import api from "../services/services";

const initialState: ChatState = {
	currentChat: null,
	allChats: []
}

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		setCurrentChat: (store, { payload, type }) => {
			store.currentChat = payload;
		},
		getAllUserChats: (state, action) => {
			state.allChats = action.payload;
		}
	}
})

export const { setCurrentChat, getAllUserChats } = chatSlice.actions;

export const selectCurrentChat = (state: RootState) => state.chat.currentChat;
export const selectAllChats = (state: RootState) => state.chat.allChats;

export const createNewChat = (formData: Chat) => async (dispatch: AppDispatch) => {
	try {
		const response = await api.post(ApiController.createChat, formData);
		const { data } = response;
	
		data && dispatch(getAllUserChats(data.allUserChats));

		return data;
	} catch (e) {
		return e as AxiosError;
	}
};

export const getAllChatsForUser = (email: string) => async (dispatch: AppDispatch) => {
	try {
		const response = await api.get(ApiController.allUserChats, {params: {email}});
		const { data } = response;

		data && dispatch(getAllUserChats(data));

		return data;
	} catch (e) {
		return e as AxiosError;
	}
};

export const getCurrentUserChat = (chatName: string) => async (dispatch: AppDispatch) => {
	try {
		const response = await api.get(ApiController.currentUserChat, { params: { chatName } });
		const { data } = response;

		data && dispatch(setCurrentChat(data))
	} catch (e) {
		return e as AxiosError;
	}
}

export const deleteChatById = (id: string) => async (dispatch: AppDispatch) => {
	try {
		await api.delete(ApiController.deleteChatById, {params: { id }});
	} catch (e) {
		return e;
	}
}

export default chatSlice.reducer;