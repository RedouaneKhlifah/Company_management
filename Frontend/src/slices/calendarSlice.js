import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    calendarDates :[]
}

const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers : {
        setcalendarDates : (state,action)=>{
            state.calendarDates = action.payload;
        }
    }
})

export const {setcalendarDates} = calendarSlice.actions;

export default calendarSlice.reducer;