const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurant.controller');

// Ruta para crear un nuevo restaurante
router.post('/', restaurantController.createRestaurant);

// Ruta para obtener todos los restaurantes
router.get('/', restaurantController.getAllRestaurants);

// Ruta para obtener un restaurante por su ID
router.get('/:id', restaurantController.getRestaurantById);

// Ruta para actualizar un restaurante
router.put('/:id', restaurantController.updateRestaurant);

// Ruta para eliminar un restaurante
router.delete('/:id', restaurantController.deleteRestaurant);

module.exports = router;
