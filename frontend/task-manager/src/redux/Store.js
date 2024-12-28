import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import auth from "./AuthSlice";
import task from "./TaskSlice";
import submission from "./SubmissionSlice";

const rootReducer = combineReducers({
    auth,
    task,
    submission,
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export default store;