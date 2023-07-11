import mongoose from "mongoose";

const ModuleSchema = mongoose.Schema({
    titre: {
        type: String,
        required: [true, "module error"]
    }
});
