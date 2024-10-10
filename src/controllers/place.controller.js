const Place = require('../models/place.model');

exports.getAllPlaces = async (req, res) => {
    try {
        const places = await Place.find();
        res.status(200).json(places);
    } catch (error) {
        console.error('Error al obtener lugares:', error.message);
        res.status(500).json({ message: 'Servidor error' });
    }
};

exports.createPlace = async (req, res) => {
    try {
        const newPlace = new Place(req.body);
        const savedPlace = await newPlace.save();
        res.status(201).json(savedPlace);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPlaceById = async (req, res) => {
    try {
        const place = await Place.findById(req.params.id);
        if (!place) return res.status(404).json({ message: 'Lugar turístico no encontrado' });
        res.status(200).json(place);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updatePlace = async (req, res) => {
    try {
        const updatedPlace = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPlace) return res.status(404).json({ message: 'Lugar turístico no encontrado' });
        res.status(200).json(updatedPlace);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deletePlace = async (req, res) => {
    try {
        const deletedPlace = await Place.findByIdAndDelete(req.params.id);
        if (!deletedPlace) return res.status(404).json({ message: 'Lugar turístico no encontrado' });
        res.status(200).json({ message: 'Lugar turístico eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
