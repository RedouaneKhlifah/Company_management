import mongoose from "mongoose";

const CompetencesSchema = mongoose.Schema(
    {
        titre: {
            type: String,
            required: [true, "please fill the titre"]
        },
        typeDeSavoire: {
            type: String,
            required: [true, "please choose the a type"]
        },
        module_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "module"
        }
    },
    { strict: false }
);

const Competence = mongoose.model("competence", CompetencesSchema);

export default Competence;
