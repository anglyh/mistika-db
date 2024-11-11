const express = require('express');
const connectDB = require('./db');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors())

connectDB();

app.use(express.json());

const userRoutes = require('./src/routes/user.routes');
const clientRoutes = require('./src/routes/client.routes');
const reservationRoutes = require('./src/routes/reservation.routes');
const eventRoutes = require('./src/routes/event.routes');
const placeRoutes = require('./src/routes/place.routes');

app.use('/auth', userRoutes);
app.use('/clients', clientRoutes);
app.use('/reservations', reservationRoutes);  
app.use('/events', eventRoutes);
app.use('/places', placeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
