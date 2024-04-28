import { createSlice } from "@reduxjs/toolkit";
import { CompetenceslessModule } from "./api/CompetenceApi"; 

const initialCompetence = localStorage.getItem("Competence")
  ? JSON.parse(localStorage.getItem("Competence"))
  : null

const initialState = {
    Competence: initialCompetence,
    ModelessCompetences : []
};

const competenceSlice = createSlice({
    name: "Competence",
    initialState,
    reducers: {
        setCompetence: (state, action) => {
            state.Competence = action.payload;
            localStorage.setItem("Competence", JSON.stringify(action.payload));
        },
        setModelessCompetences : (state, action) => {
            state.ModelessCompetences = action.payload;
        },
        clearCompetence: (state, action) => {
            state.Competence = null;
            localStorage.removeItem("Competence");
        }
    },
});


export const { setCompetence ,clearCompetence ,setModelessCompetences } = competenceSlice.actions;

export default competenceSlice.reducer;
