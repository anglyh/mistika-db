const mongoose = require("mongoose");

// Esquema base para todos los clientes
const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  googlePlaceId: { type: String, required: true, unique: true },
  location: {
    address: { type: String },
    coordinates: {
      type: [Number],
      required: true,
      index: '2dsphere'
    }
  },
  rating: { type: Number },
  priceLevel: { type: Number },
  photos: [{
    photoReference: { type: String },
    width: { type: Number },
    height: { type: Number },
  }],
  editorialSummary: { type: String },
  clientType: { type: String, required: true, enum: ['Restaurant', 'Hotel', 'Other'] }
}, { discriminatorKey: 'clientType' });

// Modelo base de Cliente
const Client = mongoose.model('Client', clientSchema);

// Esquema específico para Restaurantes
const restaurantSchema = new mongoose.Schema({
  cuisine: [{ type: String }],
  menuUrl: { type: String },
  reservationRequired: { type: Boolean },
});

// Esquema específico para Hoteles
const hotelSchema = new mongoose.Schema({
  starRating: { type: Number },
  amenities: [{ type: String }],
  roomTypes: [{ type: String }],
});

// Creamos los modelos específicos usando discriminadores
const Restaurant = Client.discriminator('Restaurant', restaurantSchema);
const Hotel = Client.discriminator('Hotel', hotelSchema);

module.exports = {
  Client,
  Restaurant,
  Hotel
};