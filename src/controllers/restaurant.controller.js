// controllers/restaurantController.js

const Restaurant = require('../models/restaurant.model');

// Obtener todos los restaurantes
exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    console.error('Error al obtener restaurantes:', error.message);
    res.status(500).json({ message: 'Servidor error' });
  }
};

// Crear un nuevo restaurante
exports.createRestaurant = async (req, res) => {
  const { name, description, image, address, rating } = req.body;

  try {
    const newRestaurant = new Restaurant({
      name,
      description,
      image,
      address,
      rating,
    });

    const savedRestaurant = await newRestaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (error) {
    console.error('Error al crear restaurante:', error.message);
    res.status(500).json({ message: 'Servidor error' });
  }
};

// Obtener un restaurante por ID
exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }
    res.json(restaurant);
  } catch (error) {
    console.error('Error al obtener restaurante:', error.message);
    res.status(500).json({ message: 'Servidor error' });
  }
};

// Actualizar un restaurante por ID
exports.updateRestaurant = async (req, res) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRestaurant) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }
    res.json(updatedRestaurant);
  } catch (error) {
    console.error('Error al actualizar restaurante:', error.message);
    res.status(500).json({ message: 'Servidor error' });
  }
};

// Eliminar un restaurante por ID
exports.deleteRestaurant = async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!deletedRestaurant) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }
    res.json({ message: 'Restaurante eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar restaurante:', error.message);
    res.status(500).json({ message: 'Servidor error' });
  }
};
