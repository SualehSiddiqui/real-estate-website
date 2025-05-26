import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
}

const spinnerSlice = createSlice({
    name: "spinner",
    initialState,
    reducers: {
        show: (state) => {
            state.status = true;
        },
        hide: (state) => {
            state.status = false;
        }
    }
});

export const { show, hide } = spinnerSlice.actions;

export default spinnerSlice.reducer;