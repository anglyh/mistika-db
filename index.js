const express = require('express');
const connectDB = require('./db');
const app = express();
require('dotenv').config();

// Connect to database
connectDB();

// Middleware for parsing JSON
app.use(express.json());

// Route imports
const userRoutes = require('./src/routes/userRoute');
const clientRoutes = require('./src/routes/clientRoute');
const reservationRoutes = require('./src/routes/reservationRoute');

// Routes
app.use('/auth', userRoutes);
app.use('/clients', clientRoutes);
app.use('/reservations', reservationRoutes);

// Server configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
