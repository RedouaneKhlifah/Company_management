import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import competenceSlice from "./slices/competenceSlice";
import { apiSlice } from "./slices/apiSlice";
import calendarSlice from "./slices/calendarSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        calendar : calendarSlice,
        competence: competenceSlice,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});

export default store;
