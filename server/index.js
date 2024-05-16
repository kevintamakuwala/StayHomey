// Dotenv
require('dotenv').config()
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

// Imports
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
const userRoutes = require('./routes/UserRoute')
const bookingRoutes = require('./routes/BookingRoute')
const placeRoutes = require('./routes/PlaceRoute')
const reviewRoutes = require('./routes/ReviewRoute')

const app = express()

// Middlewares
app.use(cors())
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/user', userRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/places', placeRoutes)
app.use('/api/review', reviewRoutes)

// Test Route
app.get('/api/test', (req, res) => {
    res.json({ "test": "success" })
})

// Listening
mongoose.connect(MONGO_URI).then(
    app.listen(PORT, () => {
        console.log(`Connected to DB and Listening at port ${PORT}`);
    })
)