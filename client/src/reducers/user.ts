import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store from '../store';

type RootState = ReturnType<typeof store.getState>;

interface UserSession {
    id: string;
    username: string;
    email: string;
    token: string;
}

const initialState: UserSession = {
    id: '',
    username: '',
    email: '',
    token: ''
  };

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        auth: (state, action: PayloadAction<UserSession>) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.token = action.payload.token;
            localStorage.setItem('token', action.payload.token);
        },

        logout: (state) => {
            state.username = '';
        },
    }
});

export const { auth, logout } = userSlice.actions;

export default userSlice;

export const selectUser = (state: RootState): UserSession => state.user;