import { configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    PAUSE,
    PURGE,
    FLUSH,
    PERSIST,
    REGISTER,
    REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "../redux/slice/userSlice";
import contactsSlice from "../redux/slice/contactsSlice";

const persistConfig = {
    key: "auth",
    storage,
    whitelist: ["token"],
};

export const store = configureStore({
    reducer: {
        auth: persistReducer(persistConfig, userSlice),
        contacts: contactsSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
    // devTools: process.env.NODE_ENV !== 'production',
});
export const persistor = persistStore(store);
