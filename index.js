const express = require('express');
const connectDB = require('./db');
const app = express();
require('dotenv').config();

connectDB();

// Middlewares
app.use(express.json());

// Rutas
const authRoutes = require('./src/routes/auth');

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
