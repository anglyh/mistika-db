const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  googlePlaceId: { type: String, required: true, unique: true },
  location: {
    address: { type: String },
    coordinates: {
      type: [Number], // Un array de dos números: [lng, lat]
      required: true,
      index: '2dsphere' // Índice geoespacial para consultas 2D
    }
  },
  rating: { type: Number },
  priceLevel: { type: Number },
  photos: [
    {
      photoReference: { type: String },
      width: { type: Number },
      height: { type: Number },
    },
  ],
  editorialSummary: { type: String }, // Añadido el campo editorialSummary
});

module.exports = mongoose.model("Client", clientSchema);
