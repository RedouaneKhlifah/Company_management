import mongoose from "mongoose";

const CompetencesSchema = mongoose.Schema(
    {
        titre: {
            type: String,
            required: [true, "please fill the titre"]
        },
        type_de_savoire: {
            type: String,
            required: [true, "please choose the a type"]
        }
    },
    { strict: false }
);

const Competence = mongoose.model("competences", CompetencesSchema);

export default Competence;
