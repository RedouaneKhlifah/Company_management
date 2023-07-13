import mongoose from "mongoose";

const emploiSchema = mongoose.Schema(
    {
        Formation: {
            type: String,
            trim: true,
            required: true
        },
        Specialite: {
            type: String,
            trim: true,
            required: true
        },
        Experience: {
            type: String,
            trim: true,
            required: true
        }
    },
    {
        timestamps: true,
        strict: false
    }
);

const Emploi = mongoose.model("Emploi", emploiSchema);

export default Emploi;
