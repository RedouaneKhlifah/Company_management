/* eslint-disable camelcase */
import asynchandler from "express-async-handler";
import Competence from "../models/CompetenceModel.js";

// Get all Competences
const fetchCompetences = asynchandler(async (req, res) => {
    let { page = 0, filters } = req.params;
    console.log(filters);

    filters = filters ? (filters = JSON.parse(filters)) : [];
    // Set filters as an empty array if it's an empty string
    console.log(filters);
    // console.log(filters);
    // const parsedFilters = JSON.parse(filters); // Parse the filters JSON string back to an

    // Build the filter criteria based on the array of filter objects
    const filterCriteria = {};
    filters.forEach((filterObj) => {
        const { field, options } = filterObj;
        filterCriteria[field] = { $in: options };
    });

    const competences = await Competence.find(filterCriteria)
        .skip(page * 20)
        .limit(20)
        .populate("module_id");
    // const rowCount = 180;
    res.json(competences);

    // // Remove the 'module_id' field from all Competence documents
    // await Competence.updateMany({}, { $unset: { module_id: 1 } });
});

// Get specific Competence
const fetchCompetenceById = asynchandler(async (req, res) => {
    const competenceId = req.params.id;
    const foundCompetence = await Competence.findById(competenceId).populate(
        "module_id"
    );
    if (!foundCompetence) {
        return res.status(400).json({
            message: "Competence not exist"
        });
    }
    res.status(200).json({ Competence: foundCompetence });
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
const deleteCompetence = asynchandler(async (req, res) => {
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

// autoComplete
const autoCompleteCompetence = asynchandler(async (req, res) => {
    const CompetencesWithNoModule = await Competence.find({
        module_id: { $exists: false }
    });
    return res.json(CompetencesWithNoModule);
});

export {
    fetchCompetences,
    fetchCompetenceById,
    createCompetence,
    updateCompetence,
    deleteCompetence,
    autoCompleteCompetence
};
