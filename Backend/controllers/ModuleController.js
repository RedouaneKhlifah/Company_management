/* eslint-disable camelcase */
import Module from "../models/ModuleModel.js";
import asynchandler from "express-async-handler";
import Competence from "../models/CompetenceModel.js";

// get all modules
const fetchModules = asynchandler(async (req, res) => {
    const modules = await Module.find();
    res.json(modules);
});

// Get specific Module
const fetchModuleById = asynchandler(async (req, res) => {
    const moduleId = req.params.id;
    const foundModule = await Module.findById(moduleId);
    if (!foundModule) {
        return res.status(400).json({
            message: "Module not exist"
        });
    }
    res.json({ module: foundModule });
});

// create a new Module
const createModule = asynchandler(async (req, res) => {
    const { titre, competences, ...otherFields } = req.body;
    console.log(req.body);
    if (!titre) {
        return res.status(400).json({ error: "Titre field is required." });
    }
    const newModule = new Module({ titre, competences, ...otherFields });
    const savedModule = await newModule.save();
    const savedModuleId = savedModule.id;
    const updateCompetences = competences.map(async (competence) => {
        return await Competence.findByIdAndUpdate(
            competence.id,
            {
                module_id: savedModuleId
            },
            { new: true }
        );
    });
    await Promise.all(updateCompetences);
    res.status(201).json(savedModule);
});

// update a module
const UpdateModule = asynchandler(async (req, res) => {
    const { titre, competences, ...otherFields } = req.body;
    const moduleId = req.params.id;
    const foundModule = await Module.findById(moduleId);
    if (!foundModule) {
        return res.status(400).json({
            message: "Module not exist"
        });
    }
    const updateddModule = await Module.findByIdAndUpdate(
        moduleId,
        {
            titre,
            competences,
            ...otherFields
        },

        { new: true }
    );

    res.status(201).json({ updateddModule });
});

export { fetchModules, fetchModuleById, createModule, UpdateModule };
