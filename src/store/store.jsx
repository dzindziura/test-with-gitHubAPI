import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./Main/MainSlice"

export const store = configureStore({
    reducer: {
        reducer: mainReducer,
    }
})