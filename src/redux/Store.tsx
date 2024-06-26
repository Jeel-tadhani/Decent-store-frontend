import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import ClientReducer from "./Reducer/ClientReducer";
import PathReducer from "./Reducer/PathReducer";
import UserReducer from "./Reducer/UserReducer";

const persistConfig = {
	key: "root",
	storage,
};

const persistPathConfig = {
	key: "path",
	storage,
};

const persistClientConfig = {
	key: "client",
	storage,
};

const persistedReducer = persistReducer(persistConfig, UserReducer);
const pathReducer = persistReducer(persistPathConfig, PathReducer);
const clientReducer = persistReducer(persistClientConfig, ClientReducer);

export const store = configureStore({
	reducer: {
		client: clientReducer,
		path: pathReducer,
		user: persistedReducer,
	},
});

export const persistor = persistStore(store);
