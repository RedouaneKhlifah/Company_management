import mongoose from "mongoose";


const emploiSchema = mongoose.Schema({
    Formation: {
        type: String,
        required: true,
    },
    Specialite: {
        type: String,
        required: true,
    },
    Experience: {
        type: String,
        required: true,
    },
},{
    timestamps: true
});


  
  const Emploi = mongoose.model('Emploi', emploiSchema);
  
  export default Emploi;
  