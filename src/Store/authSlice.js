import { createSlice } from "@reduxjs/toolkit";

// authSlice.js
const initialState = {
    status: null,  // null = unknown, true = logged in, false = logged out
    user: null,
    isChecking: true,  // <-- start as true (checking auth)
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.user = action.payload;
            state.isChecking = false;
        },
        logout: (state) => {
            state.status = false;
            state.user = null;
            state.isChecking = false;
        },
        startChecking: (state) => {
            state.isChecking = true;
        }
    }
});

export const { login, logout, startChecking } = authSlice.actions;
export default authSlice.reducer;