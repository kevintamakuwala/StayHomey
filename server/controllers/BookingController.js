// Imports
const Booking = require("../models/BookingModel");

// Get All Bookings
const getBookings = async (req, res) => {
  res.json(await Booking.find());
};

// Add New Booking
const postBookings = async (req, res) => {
  const { place, user, checkIn, numberOfGuests, checkOut, name, phone, price } =
    req.body;

  try {
    const booking = await Booking.book(
      place,
      user,
      checkIn,
      numberOfGuests,
      checkOut,
      name,
      phone,
      price
    );
    res.status(200).json({ booking });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};

module.exports = { getBookings, postBookings };
