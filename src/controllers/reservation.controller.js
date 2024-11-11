const Reservation = require('../models/reservation.model');
const { Client } = require('../models/client.model');
const User = require('../models/user.model');

exports.createReservation = async (req, res) => {
  try {
    // Verificar si existe el cliente (negocio) y el usuario
    const [clientExists, userExists] = await Promise.all([
      Client.findById(req.body.clientId),
      User.findById(req.body.userId)
    ]);

    if (!clientExists) {
      return res.status(404).json({ message: 'Business not found' });
    }
    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newReservation = new Reservation(req.body);
    const savedReservation = await newReservation.save();

    // Actualizar las referencias en cliente y usuario
    await Promise.all([
      Client.findByIdAndUpdate(
        req.body.clientId,
        { $push: { reservations: savedReservation._id } }
      ),
      User.findByIdAndUpdate(
        req.body.userId,
        { $push: { reservationsId: savedReservation._id } }
      )
    ]);
    
    // Poblar la información completa
    const populatedReservation = await Reservation.findById(savedReservation._id)
      .populate('userId', 'name email') // Información del usuario que hizo la reserva
      .populate('clientId', 'name clientType location') // Información del negocio
      .exec();

    res.status(201).json(populatedReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get reservations by client ID (para el dueño del negocio)
exports.getReservationsByClientId = async (req, res) => {
  //console.log(req.params.clientId);
  try {
    const reservations = await Reservation.find({ clientId: req.params.clientId })
      .populate('userId', 'name email') // Información del usuario que hizo la reserva
      .sort({ reservationDate: -1 })
      .exec();

    if (!reservations || reservations.length === 0) {
      return res.status(404).json({ message: 'No reservations found for this business' });
    }

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single reservation by ID
exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('clientId', 'name clientType location')
      .exec();

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all reservations by user ID (para el usuario final)
exports.getReservationsByUserId = async (req, res) => {
  try {
    const reservations = await Reservation.find({ userId: req.params.userId })
      .populate('clientId', 'name clientType location') // Información del negocio
      .sort({ reservationDate: -1 })
      .exec();

    if (!reservations || reservations.length === 0) {
      return res.status(404).json({ message: 'No reservations found for this user' });
    }

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update reservation status (para el dueño del negocio)
exports.updateReservationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const allowedStatuses = ['pendiente', 'aprobado', 'cancelado'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ 
        message: 'Estado inválido. Debe ser: pendiente, aprobado, o cancelado' 
      });
    }

    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    )
    .populate('userId', 'name email')
    .populate('clientId', 'name clientType location');

    if (!updatedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.status(200).json(updatedReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a reservation
exports.updateReservation = async (req, res) => {
  try {
    if (req.body.status) {
      const allowedStatuses = ['pendiente', 'aprobado', 'cancelado'];
      if (!allowedStatuses.includes(req.body.status)) {
        return res.status(400).json({ 
          message: 'Estado inválido. Debe ser: pendiente, aprobado, o cancelado' 
        });
      }
    }

    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    .populate('userId', 'name email')
    .populate('clientId', 'name clientType location');

    if (!updatedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.status(200).json(updatedReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a reservation
exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    // Eliminar la referencia de la reserva en el cliente y usuario
    await Promise.all([
      Client.findByIdAndUpdate(
        reservation.clientId,
        { $pull: { reservations: reservation._id } }
      ),
      User.findByIdAndUpdate(
        reservation.userId,
        { $pull: { reservationsId: reservation._id } }
      )
    ]);

    await Reservation.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};