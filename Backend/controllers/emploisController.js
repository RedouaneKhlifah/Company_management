import asyncHandler from 'express-async-handler';
import Emploi from '../models/emploiModel.js';

// CREATE operation
const createEmploi = asyncHandler(async (req, res) => {
  const { Formation, Specialite, Experience } = req.body;
  console.log('Request Body:', req.body);
  const newEmploi = new Emploi({ Formation, Specialite, Experience });
  const savedEmploi = await newEmploi.save();
  res.status(201).json(savedEmploi);
});

// READ operation
const fetchEmplois = asyncHandler(async (req, res) => {
  const emplois = await Emploi.find();
  res.status(200).json(emplois);
});

// READ operation - Fetch a single emploi
const fetchEmploi = asyncHandler(async (req, res) => {
    const emploiId = req.params.id; // Assuming the employment record ID is passed as a parameter in the request
  
    try {
      const emploi = await Emploi.findById(emploiId);
      
      if (!emploi) {
        return res.status(404).json({ error: 'Employment record not found' });
      }
      
      res.status(200).json(emploi);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }); 

// UPDATE operation
const updateEmploi = asyncHandler(async (req, res) => {
  const { Formation, Specialite, Experience } = req.body;
  const updatedEmploi = await Emploi.findByIdAndUpdate(
    req.params.id,
    { Formation, Specialite, Experience },
    { new: true }
  );
  res.status(200).json(updatedEmploi);
});

// DELETE operation
const deleteEmploi = asyncHandler(async (req, res) => {
  const deletedEmploi = await Emploi.findByIdAndRemove(req.params.id);
  res.status(200).json(deletedEmploi);
});

export { createEmploi, fetchEmplois, updateEmploi, deleteEmploi };
