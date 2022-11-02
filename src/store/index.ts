import { configureStore } from '@reduxjs/toolkit';
import authSlice from './reducers/auth/authSlice';
import popupSlice from './reducers/auth/popupSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        popup: popupSlice
    }
});
