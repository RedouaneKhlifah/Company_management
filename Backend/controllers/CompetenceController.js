/* eslint-disable camelcase */
import asynchandler from "express-async-handler";
import Competence from "../models/CompetenceModel.js";
import Module from "../models/ModuleModel.js";

// Get all Competences
const fetchCompetences = asynchandler(async (req, res) => {
    const competences = await Competence.find();
    const competencesWithModule = await Promise.all(
        competences.map(async (competence) => {
            const module = await Module.findOne({
                competences: competence._id
            });
            return {
                competence,
                module: module?.titre
            };
        })
    );

    res.json({ competencesWithModule });
});

// Get specific Competence
const fetchCompetenceById = asynchandler(async (req, res) => {
    const competenceId = req.params.id;
    const foundCompetence = await Competence.findById(competenceId);
    if (!foundCompetence) {
        return res.status(400).json({
            message: "Competence not exist"
        });
    }

    const module = await Module.findOne({ competences: competenceId });
    res.status(200).json({ Competence: foundCompetence, module });
});

// Create a new Competence
const createCompetence = asynchandler(async (req, res) => {
    const { titre, typeDeSavoire, ...otherFields } = req.body;

    const foundCompetence = await Competence.findOne({ titre });
    if (foundCompetence) {
        return res.status(400).json({
            message: "Competence already exists change the title"
        });
    }

    const savedCompetence = await Competence.create({
        titre,
        typeDeSavoire,
        ...otherFields
    });

    res.status(201).json(savedCompetence);
});

// Update a competence
const updateCompetence = asynchandler(async (req, res) => {
    const competenceId = req.params.id;
    const body = req.body;
    const theCompetence = await Competence.findById(competenceId);
    if (!theCompetence) {
        return res.status(400).json({
            message: "Competence not exist"
        });
    }

    const updatedCompetence = await Competence.findByIdAndUpdate(
        competenceId,
        body,
        { new: true }
    );

    res.json(updatedCompetence);
});

// Delete a competence
const deleteCompetence = asynchandler(async function (req, res) {
    const competenceId = req.params.id;
    const body = req.body;
    const foundCompetence = await Competence.findById(competenceId);
    console.log(body, foundCompetence);
    if (!foundCompetence) {
        return res.status(400).json({
            message: "Competence not exist"
        });
    }

    // const module = await Module.findOne({ competences: competenceId });
    // const updatedModule = module.competences.filter((competence) => {
    //     competence !== competenceId;
    // });

    // updatedModule.save();
    const deletedCompetence = await Competence.findByIdAndDelete(competenceId);
    res.json(`${deletedCompetence.titre} got succufuly Deleted`);
});
export {
    fetchCompetences,
    fetchCompetenceById,
    createCompetence,
    updateCompetence,
    deleteCompetence
};
