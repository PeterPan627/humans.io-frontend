import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const collectionSlice = createSlice({
    name: "collections",
    initialState,
    reducers: {
        setCollectionInfo: (state, action) => {
            const [key, data] = action.payload;
            const newState = {
                ...state,
                [key]: data,
            };
            return newState;
        },
    },
});

export const { setCollectionInfo } = collectionSlice.actions;

export default collectionSlice.reducer;
