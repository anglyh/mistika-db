const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  reservationsId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation'}], // Pluralized
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
