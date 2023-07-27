import asyncHandler from "express-async-handler";
import Emploi from "../models/EmploiModel.js";
import Competence from "../models/CompetenceModel.js";

// @desc    Create a new emploi
// @route   POST /api/emplois
// @access  Public

const createEmploi = asyncHandler(async (req, res) => {
    console.log(req.body);
    const emploiExist = await Emploi.findOne({
        "info_emploi.Titre": req.body.info_emploi.Titre
    });
    if (emploiExist) {
        res.status(400);
        throw new Error("L'emploi est déjà existé.");
    }
    const { Titre, Formation, Spécialité, Expérience, ...otherInfo } =
        req.body.info_emploi;
    const Compétences = await Promise.all(
        req.body.Compétences.map(async (compétence) => {
            // Find the competence by its competence_id
            const existingCompetence = await Competence.findById(
                compétence.competence_id
            );
            if (existingCompetence) {
                return {
                    competence_id: compétence.competence_id,
                    Niveau: compétence.Niveau
                };
            }
        })
    );
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

const fetchAllEmplois = async (req, res) => {
    const page = parseInt(req.query.page) - 1 || 0;
    const search = req.query.search || "";
    const filter = req.query.filter || "";
    const groupby = req.query.groupby || "";
    const sort = req.query.sort || "Titre";
    const sortOrder = req.query.order === "desc" ? -1 : 1;

    const sortBy = {};
    sortBy[`info_emploi.${sort}`] = sortOrder;

    const query = {};
    // If search query is provided, use it for the 'Titre' field
    if (search) {
        query["info_emploi.Titre"] = { $regex: search, $options: "i" };
    }
    if (filter) {
        if (
            groupby === "Formation" ||
            groupby === "Expérience" ||
            groupby === "Spécialité"
        ) {
            query[`info_emploi.${groupby}`] = { $regex: filter, $options: "i" };
        }
    }

    const emploisPerPage = 12;
    const skip = page * emploisPerPage;
    const emplois = await Emploi.find(query)
        .sort(sortBy)
        .skip(skip)
        .limit(emploisPerPage);
    const rowCount = await Emploi.countDocuments(query);
    res.status(200).json({ emplois, rowCount });
};

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
        emploi
    });
});

// @desc    Update an emploi by ID
// @route   PUT /api/emplois/:id
// @access  Public

const updateEmploi = asyncHandler(async (req, res) => {
    const emploiId = req.params.id;
    const updateData = req.body;

    const existingEmploi = await Emploi.findById(emploiId);
    if (!existingEmploi) {
        res.status(404);
        throw new Error("L'emploi spécifié n'a pas été trouvé.");
    }

    // Update the Emploi document with the provided data
    const updatedEmploi = await Emploi.findByIdAndUpdate(emploiId, updateData, {
        new: true
    });

    // If the Emploi document was updated, add the update history to it
    if (updatedEmploi) {
        updatedEmploi.history.updatedBy.push({
            user_id: req.user._id,
            timestamp: new Date()
        });

        // Save the updated Emploi document with the update history
        await updatedEmploi.save();

        res.status(200).json({
            message: "L'emploi a été mis à jour avec succès.",
            data: updatedEmploi
        });
    } else {
        res.status(500);
        throw new Error("Erreur lors de la mise à jour de l'emploi.");
    }
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
