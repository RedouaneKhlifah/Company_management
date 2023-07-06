import Competence from "../models/CompetenceModal";
import asynchandler from "express-async-handler";

const fetchCompetence = asynchandler(async function () {
    const fetchCompetences = await Competence.find();
    res.json();
});

export { fetchCompetence };
