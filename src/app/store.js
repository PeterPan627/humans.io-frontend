import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import collectionReducer from "./collectionsSlice";
import marketplaceNftsReducer from "./marketplaceNftsSlice";
import balanceReducer from "./balanceSlice";

const persistConfig = {
    key: "root",
    storage,
};

const reducer = persistReducer(
    persistConfig,
    combineReducers({
        collections: collectionReducer,
        marketplaceNfts: marketplaceNftsReducer,
        balance: balanceReducer,
    })
);

export const store = configureStore({
    reducer,
    middleware: (mw) => mw({ immutableCheck: false, serializableCheck: false }),
});

export const persistor = persistStore(store);
