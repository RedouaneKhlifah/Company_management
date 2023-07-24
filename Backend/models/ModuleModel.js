import mongoose from "mongoose";

const ModuleSchema = mongoose.Schema(
    {
        titre: {
            type: String,
            required: [true, "module error"]
        },
        competence: [
            { type: mongoose.Schema.Types.ObjectId, ref: "competence" }
        ]
    },
    { strict: false }
);

const Module = mongoose.model("module", ModuleSchema);

export default Module;
