import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../src/reducers/user';

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    },
});

export default store;