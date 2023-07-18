import asyncHandler from "express-async-handler";
import Emploi from "../models/EmploiModel.js";

// @desc    Create a new emploi
// @route   POST /api/emplois
// @access  Public
const createEmploi = asyncHandler(async (req, res) => {
    console.log(req.body);
    const emploiData = req.body;
    const newEmploi = await Emploi.create(emploiData);
    res.status(201).json(newEmploi);
});

// @desc    Get all emplois
// @route   GET /api/emplois
// @access  Public
const fetchAllEmplois = asyncHandler(async (req, res) => {
    const emplois = await Emploi.find();
    res.status(200).json(emplois);
});

// @desc    Get a single emploi by ID
// @route   GET /api/emplois/:id
// @access  Public
const fetchSingleEmploi = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const emploi = await Emploi.findById(id);
    if (emploi) {
        res.status(200).json(emploi);
    } else {
        res.status(404).json({ message: "Emploi not found" });
    }
});

// @desc    Update an emploi by ID
// @route   PUT /api/emplois/:id
// @access  Public
const updateEmploi = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updatedEmploi = await Emploi.findByIdAndUpdate(id, req.body, {
        new: true
    });
    res.status(200).json(updatedEmploi);
});

// @desc    Delete an emploi by ID
// @route   DELETE /api/emplois/:id
// @access  Public
const deleteEmploi = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await Emploi.findByIdAndDelete(id);
    res.status(200).json({ message: "Emploi deleted successfully" });
});

export {
    createEmploi,
    fetchAllEmplois,
    fetchSingleEmploi,
    updateEmploi,
    deleteEmploi
};
