import { createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import { CREATEUSER } from '../../constants/constants.js';
const initialState = {
    data: [],
    loading: 'idle',
    language: []
}

const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        allDataLoading: (state) => {
            state.loading = "loading"
        },
        allDataReceived: (state, { payload }) => {
            state.loading = "idle";
            state.data = payload;
            axios.post(CREATEUSER, payload.user)
        },
        filterRepos: (state, { payload }) => {
            state.language = payload
        },
    },
    extraReducers: (builder) => {},
})

export const {
    allDataLoading,
    allDataReceived,
    filterRepos
} = mainSlice.actions;


export default mainSlice.reducer;