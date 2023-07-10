import asynchandler from "express-async-handler";
import Competence from "../models/CompetencesModal.js";

// Get all Competences
const fetchCompetences = asynchandler(async function (req, res) {
    const Competences = await Competence.find();
    res.json(Competences);
});

// Get specific Competence
const fetchOneCompetence = asynchandler(async function (req, res) {
    const CompetenceId = req.params.id;
    const theCompetence = await Competence.findById(CompetenceId);
    if (!theCompetence) {
        return res.status(400).json({
            message: "Competence not exist"
        });
    }
    res.status(200).json(theCompetence);
});

// Get a new Competence
const createCompetence = asynchandler(async function (req, res) {
    const { titre, type_de_savoire, module_id, ...otherFields } = req.body;

    const existCompetence = await Competence.findOne({ titre });
    if (existCompetence) {
        return res.status(400).json({
            message: "Competence already exists change the title"
        });
    }

    const newCompetence = await Competence.create({
        titre,
        type_de_savoire,
        ...otherFields
    });

    res.status(201).json(newCompetence);
});

// Update a competence
const updateCompetence = asynchandler(async function (req, res) {
    const CompetenceId = req.params.id;
    const body = req.body;
    const theCompetence = await Competence.findById(CompetenceId);
    if (!theCompetence) {
        return res.status(400).json({
            message: "Competence not exist"
        });
    }

    const updatedCompetence = await Competence.findByIdAndUpdate(
        CompetenceId,
        body,
        { new: true }
    );

    res.json(updatedCompetence);
});

// Delete a competence
const deleteCompetence = asynchandler(async function (req, res) {
    const CompetenceId = req.params.id;
    const body = req.body;
    const theCompetence = await Competence.findById(CompetenceId);
    console.log(body, theCompetence);
    if (!theCompetence) {
        return res.status(400).json({
            message: "Competence not exist"
        });
    }

    const deletedCompetence = await Competence.findByIdAndDelete(CompetenceId);
    res.json(`${deletedCompetence.titre} got succufuly Deleted`);
});
export {
    fetchCompetences,
    fetchOneCompetence,
    createCompetence,
    updateCompetence,
    deleteCompetence
};
