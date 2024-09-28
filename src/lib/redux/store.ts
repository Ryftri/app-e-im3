import { combineReducers, configureStore } from "@reduxjs/toolkit";
import showSideBarSlice from "./features/showSideBar/showSideBarSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { userReducer} from "./features/users/usersSlice";
import { ApiEiM3Slice } from "./services/api/ApiEiM3Slice";
import { loadFromLocalStorage } from "../localStorage/localStorageHelper";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { isLoginReducer } from "./features/isLogin/isLogin";
import { questionsReducer } from "./features/question/questionReducer";

const createNoopStorage = () => {
    return {
        getItem(_key: string): Promise<string | null> {
            return Promise.resolve(null);
        },
        setItem(_key: string, value: string): Promise<string> {
            return Promise.resolve(value);
        },
        removeItem(_key: string): Promise<void> {
            return Promise.resolve();
        },
    };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [ApiEiM3Slice.reducerPath, 'isLogin', 'questions']
};
  
const rootReducer = combineReducers({
    showSideBar: showSideBarSlice,
    user: userReducer,
    isLogin: isLoginReducer,
    questions: questionsReducer,
    [ApiEiM3Slice.reducerPath]: ApiEiM3Slice.reducer,
});
  
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['persist/PERSIST'],
            ignoredActionPaths: ['payload.data'],
            ignoredPaths: ['api'],
        },
    }).concat(ApiEiM3Slice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);