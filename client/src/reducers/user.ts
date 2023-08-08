import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//import store from '../store';

//type RootState = ReturnType<typeof store.getState>;

interface UserSession {
    _id: string;
    username: string;
    email: string;
    token: string;
}

const initialState: UserSession = {
    _id: '',
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
            state._id = action.payload._id;
            state.token = action.payload.token;
            // @ts-ignore
            localStorage.setItem('token', action.payload.token);
        },

        logout: (state) => {
            state.username = '';
        },
    }
});

export const { auth, logout } = userSlice.actions;

export default userSlice;

export const selectUser = (state: any): UserSession => state.user;