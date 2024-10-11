const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation.controller');

// Route to create a new reservation
router.post('/', reservationController.createReservation);

// Route to retrieve all reservations
router.get('/', reservationController.getAllReservations);

// Route to retrieve a single reservation by ID
router.get('/:id', reservationController.getReservationById);

router.get('/getByUserId/:userId', reservationController.getReservationByUserId);

// Route to update a reservation
router.put('/:id', reservationController.updateReservation);

// Route to delete a reservation
router.delete('/:id', reservationController.deleteReservation);

module.exports = router;
