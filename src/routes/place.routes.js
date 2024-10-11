const express = require('express');
const router = express.Router();
const placeController = require('../controllers/place.controller');

router.post('/', placeController.createPlace);
router.get('/', placeController.getAllPlaces);
router.get('/:id', placeController.getPlaceById);
router.put('/:id', placeController.updatePlace);
router.delete('/:id', placeController.deletePlace);

module.exports = router;