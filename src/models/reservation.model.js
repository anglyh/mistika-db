const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client'},
    reservationDate: { type: Date, required: true },
    status: { type: String, enum: ['pendiente', 'aprobado', 'cancelado']},
    paymentInfo: {
      amount: { type: Number, required: true },
      method: { type: String, enum: ['tarjeta', 'efectivo', 'movil']},
      paymentDate: { type: Date, required: true },
    }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Reservation', ReservationSchema);