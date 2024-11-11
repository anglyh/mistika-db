const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  clientType: { type: String, required: true, enum: ['Restaurante', 'Hotel', 'Otro'] },
  googlePlaceId: { type: String, required: true, unique: true },
  location: {
    address: { type: String, required: true },
    coordinates: {
      type: [Number],
      required: true,
      index: '2dsphere'
    }
  },
  rating: { type: Number },
  photos: [{
    photoReference: { type: String },
    width: { type: Number },
    height: { type: Number },
  }],
  editorialSummary: { type: String },
  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }]
}, { discriminatorKey: 'clientType' });

const Client = mongoose.model('Client', clientSchema);

const restaurantSchema = new mongoose.Schema({
  cuisine: [{ type: String }],
  menuUrl: { type: String },
  reservationRequired: { type: Boolean },
});

const hotelSchema = new mongoose.Schema({
  starRating: { type: Number },
  amenities: [{ type: String }],
  roomTypes: [{ type: String }],
});

const Restaurant = Client.discriminator('Restaurante', restaurantSchema);
const Hotel = Client.discriminator('Hotel', hotelSchema);

module.exports = {
  Client,
  Restaurant,
  Hotel
};