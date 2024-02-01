import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from '../types/userTypes';
import { RootState } from './store';
import {
  getLogoutUser,
  getUserByID,
  postAuthUser,
  postRegisteredUser
} from '../services/services';

const initialState: AuthState = {
  user: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postAuthUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getLogoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(postRegisteredUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getUserByID.fulfilled, (state, action) => {
        // eslint-disable-next-line prettier/prettier, no-console
          console.log('payload: ', action.payload);
        state.user = action.payload;
      });
  }
});

export const selectCurrentUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
