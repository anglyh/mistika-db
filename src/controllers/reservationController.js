const Reservation = require('../models/Reservation');

// Create a new reservation
exports.createReservation = async (req, res) => {
  try {
    const newReservation = new Reservation(req.body);
    const savedReservation = await newReservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Retrieve all reservations
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single reservation by ID
exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).json({ message: 'Reservation not found' });
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a reservation
exports.updateReservation = async (req, res) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a reservation
exports.deleteReservation = async (req, res) => {
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!deletedReservation) return res.status(404).json({ message: 'Reservation not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
