const fs = require("fs");
const Place = require("../models/PlaceModel");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

// Get All Places
const getAllPlaces = async (req, res) => {
  res.json(await Place.find());
};

// Get a single Place
const getPlaceByID = async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
};

// ADD new Place
const addPlace = async (req, res) => {
  const {
    owner,
    title,
    address,
    addedPhotos,
    description,
    price,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;

  const placeDoc = await Place.create({
    price,
    owner,
    title,
    address,
    photos: addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  });

  res.json(placeDoc);
};

// Update a Place
const updatePlace = async (req, res) => {
  const {
    id,
    owner,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  const placeDoc = await Place.findById(id);
  placeDoc.set({
    owner,
    title,
    address,
    photos: addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  });
  await placeDoc.save();
  res.json("ok");
};

module.exports = { getAllPlaces, getPlaceByID, addPlace, updatePlace };
