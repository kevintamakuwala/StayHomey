// Imports
const express = require('express');
const { getAllPlaces, getPlaceByID, addPlace, updatePlace } = require('../controllers/PlaceController.js');

// Router Setup
const router = express.Router();

// Get All Places
router.get('/', getAllPlaces);

// Get one by ID
router.get('/:id', getPlaceByID);

// Add New
router.post('/', addPlace);

// Update Exisiting Place
router.put('/', updatePlace);

// Exports
module.exports = router;