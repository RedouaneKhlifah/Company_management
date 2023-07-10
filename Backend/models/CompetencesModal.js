import mongoose from "mongoose";

const CompetenceSchema = mongoose.Schema(
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

const Competence = mongoose.model("competences", CompetenceSchema);

export default Competence;
