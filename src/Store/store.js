import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import spinnerSlice from "./spinnerSlice.js";

const store = configureStore({
    reducer: {
        auth: authSlice,
        spinner: spinnerSlice,
    }
})

export default store;