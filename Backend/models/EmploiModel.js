import mongoose from "mongoose";

const emploiSchema = mongoose.Schema(
    {
        info_emploi: {
            Formation: {
                type: String,
                trim: true,
                required: true
            },
            Spécialité: {
                type: String,
                trim: true,
                required: true
            },
            Expérience: {
                type: String,
                trim: true,
                required: true
            }
        },
        Compétences: [
            {
                competence_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Competence"
                },
                Titre: {
                    type: String,
                    required: true
                },
                "Type de savoire": {
                    type: String,
                    required: true
                },
                Niveau: {
                    type: Number,
                    required: true
                }
            }
        ],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },

    {
        timestamps: true,
        strict: false
    }
);

const Emploi = mongoose.model("Emploi", emploiSchema);

export default Emploi;
