import Emploi from "../models/emploiModel.js";

// CREATE operation
const createEmploi = async (req, res) => {
  try {
    const { Formation, Specialite, Experience } = req.body;
    const newEmploi = new Emploi({ Formation, Specialite, Experience });
    const savedEmploi = await newEmploi.save();
    res.status(201).json(savedEmploi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ operation
const getEmplois = async (req, res) => {
  try {
    const emplois = await Emploi.find();
    res.status(200).json(emplois);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE operation
const updateEmploi = async (req, res) => {
  try {
    const { Formation, Specialite, Experience } = req.body;
    const updatedEmploi = await Emploi.findByIdAndUpdate(
      req.params.id,
      { Formation, Specialite, Experience },
      { new: true }
    );
    res.status(200).json(updatedEmploi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE operation
const deleteEmploi = async (req, res) => {
  try {
    const deletedEmploi = await Emploi.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedEmploi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createEmploi, getEmplois, updateEmploi, deleteEmploi };
