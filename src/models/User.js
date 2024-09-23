const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tipo: { type: String, enum: ['usuario', 'cliente'], default: 'usuario' },
  negocios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Negocio' }], // Solo si es cliente
  reservas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reserva' }], // Solo si es turista
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
