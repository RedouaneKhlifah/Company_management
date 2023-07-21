import asyncHandler from "express-async-handler";
import Emploi from "../models/EmploiModel.js";

// @desc    Create a new emploi
// @route   POST /api/emplois
// @access  Public

const createEmploi = asyncHandler(async (req, res) => {
    const emploiExist = await Emploi.findOne({
        "info_emploi.Titre": req.body.info_emploi.Titre
    });
    if (emploiExist) {
        res.status(400);
        throw new Error("L'emploi est déjà existé.");
    }
    const { Titre, Formation, Spécialité, Expérience, ...otherInfo } =
        req.body.info_emploi;
    const Compétences = req.body.Compétences;
    const history = {
        createdBy: {
            user_id: req.user._id,
            timestamp: new Date()
        }
    };

    const newEmploi = await Emploi.create({
        info_emploi: {
            Titre,
            Formation,
            Spécialité,
            Expérience,
            ...otherInfo
        },
        Compétences,
        history
    });

    res.status(201).json({
        message: "L'emploi a été créé avec succès.",
        data: newEmploi
    });
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
    const emploiId = req.params.id;

    const emploi = await Emploi.findById(emploiId);

    if (!emploi) {
        res.status(404);
        throw new Error("L'emploi spécifié n'a pas été trouvé.");
    }

    res.status(200).json({
        data: emploi
    });
});

// @desc    Update an emploi by ID
// @route   PUT /api/emplois/:id
// @access  Public
const updateEmploi = asyncHandler(async (req, res) => {
    const emploiId = req.params.id;
    const updateData = req.body;

    const updatedEmploi = await Emploi.findByIdAndUpdate(emploiId, updateData, {
        new: true
    });

    if (!updatedEmploi) {
        res.status(404);
        throw new Error("L'emploi spécifié n'a pas été trouvé.");
    }

    res.status(200).json({
        message: "L'emploi a été mis à jour avec succès.",
        data: updatedEmploi
    });
});

// @desc    Delete an emploi by ID
// @route   DELETE /api/emplois/:id
// @access  Public
const deleteEmploi = asyncHandler(async (req, res) => {
    const emploiId = req.params.id;

    const deletedEmploi = await Emploi.findByIdAndDelete(emploiId);

    if (!deletedEmploi) {
        res.status(404);
        throw new Error("L'emploi spécifié n'a pas été trouvé.");
    }

    res.status(200).json({
        message: "L'emploi a été supprimé avec succès.",
        data: deletedEmploi
    });
});

export {
    createEmploi,
    fetchAllEmplois,
    fetchSingleEmploi,
    updateEmploi,
    deleteEmploi
};
