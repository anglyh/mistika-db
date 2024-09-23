const mongoose = require('mongoose');
require('dotenv').config(); 

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error al conectar a MongoDB: ${error.message}`);
    process.exit(1); // Detener la aplicación si hay error en la conexión
  }
};

module.exports = connectDB;
