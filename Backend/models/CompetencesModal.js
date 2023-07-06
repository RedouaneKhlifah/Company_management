import mongoose from "mongoose";

const CompetenceSchema = mongoose.Schema({
    titre: {
        type: String,
        required: [true, "please fill the titre"]
    },
    type_de_savoire: {
        titre: String,
        required: [true, "please choose the a type"]
    },
    module_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "model"
    }
});

const Competence = mongoose.model("Competence", CompetenceSchema);

export default Competence;
