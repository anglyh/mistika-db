const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation.controller');

router.post('/', reservationController.createReservation);
router.get('/getByClientId/:clientId', reservationController.getReservationsByClientId);
router.get('/:id', reservationController.getReservationById);
router.get('/getByUserId/:userId', reservationController.getReservationsByUserId);
router.patch('/:id/status', reservationController.updateReservation);
router.delete('/:id', reservationController.deleteReservation);

module.exports = router;
