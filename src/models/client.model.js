const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    location: {
      address: { type: String, required: true },
      coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
      },
    },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Client', ClientSchema);
  