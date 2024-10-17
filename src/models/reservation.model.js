const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    reservationDate: { type: Date, required: true },
    status: { type: String, enum: ['pendiente', 'aprobado', 'cancelado'], default: 'pendiente' },
    paymentInfo: {
      amount: { type: Number, required: true },
      method: { type: String, enum: ['tarjeta', 'efectivo', 'movil']},
      paymentDate: { type: Date, required: true },
    }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Reservation', ReservationSchema);