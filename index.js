const express = require('express');
const connectDB = require('./db');
const app = express();
require('dotenv').config();

// Connect to database
connectDB();

// Middleware for parsing JSON
app.use(express.json());

// Route imports
const userRoutes = require('./src/routes/user.routes');
const clientRoutes = require('./src/routes/client.routes');
const reservationRoutes = require('./src/routes/reservation.routes');
const eventRoutes = require('./src/routes/event.routes');
const restaurantRoutes = require('./src/routes/restaurant.routes')

// Routes
app.use('/auth', userRoutes);
app.use('/clients', clientRoutes);
app.use('/reservations', reservationRoutes);
app.use('/events', eventRoutes);
app.use('/restaurants', restaurantRoutes);

// Server configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
