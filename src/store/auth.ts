import { createSlice } from "@reduxjs/toolkit";
import { AuthState, UserRegister } from "../types/user-types";
import { AppDispatch } from "./store";
import api from "../services/services";
import { ApiController } from "../config/apiController.constants";
import { AxiosError } from "axios";

const initialState: AuthState = {
	user: null
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		fetchAuthSuccess: (state, action) => {
			const {user} = action.payload;
			state.user = user;
		},
		logout: (state, action) => {
			state.user = null;
		},
	},
});

export const {fetchAuthSuccess} = authSlice.actions;

export const loginUser =
  (formData: {email: string; password: string} ) => async (dispatch: AppDispatch) => {
    try {
      const response = await api.post(ApiController.login, formData);
			const { data } = response;

			data.accessToken && dispatch(fetchAuthSuccess(data));

			return data;
		} catch (e) {
			return e as AxiosError;
		}
  };

export const logoutUser = () => async (dispatch: AppDispatch) => {
	const response = await api.get(ApiController.logout);
	
	sessionStorage.clear();
	return response;
};

export const registerUser = (formData: UserRegister) => async (dispatch: AppDispatch) => {
	try {
		const response = await api.post(ApiController.register, formData);
		const { data } = response;

		data.accessToken && dispatch(fetchAuthSuccess(data));

		return data;
	} catch (e) {
		return e as AxiosError;
	}
};

export default authSlice.reducer;