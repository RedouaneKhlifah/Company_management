import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Competence: null
};

const competenceSlice = createSlice({
    name: "Competence",
    initialState,
    reducers: {
        setCompetence: (state, action) => {
            state.Competence = action.payload;
            localStorage.setItem("Competence", JSON.stringify(action.payload));
        },
        clearCompetence: (state, action) => {
            state.Competence = null;
            localStorage.removeItem("Competence");
        }
    }
});

export const { setCompetence ,clearCompetence } = competenceSlice.actions;

export default competenceSlice.reducer;
