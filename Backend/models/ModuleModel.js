import mongoose from "mongoose";

const ModuleSchema = mongoose.Schema(
    {
        titre: {
            type: String,
            required: [true, "module error"]
        },
        competences: [
            { type: mongoose.Schema.Types.ObjectId, ref: "competences" }
        ]
    },
    { strict: false }
);

const Module = mongoose.model("module", ModuleSchema);

export default Module;
