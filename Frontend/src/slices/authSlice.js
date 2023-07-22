import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        },
        clearCredentials: (state, action) => {
            state.userInfo = null;
            localStorage.removeItem("userInfo");
        }
    }
});
console.log("authSlice.actions: ", authSlice.actions);
console.log("authSlice.reducer: ", authSlice.reducer);

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;
