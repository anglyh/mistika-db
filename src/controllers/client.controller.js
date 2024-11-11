require('dotenv').config();
const { Client, Restaurant, Hotel } = require('../models/client.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registerClient = async (req, res) => {
  const { username, email, password, clientType, place } = req.body;
  const { name, address, location, rating, photos, types, place_id } = place;
  try {
    if (!username || !email || !password || !clientType || !place) {
      return res.status(400).json({ message: 'Todos los campos obligatorios deben ser proporcionados' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'El correo electrónico no es válido' });
    }

    let client = await Client.findOne({ email });
    if (client) {
      return res.status(409).json({ message: 'El correo electrónico ya está registrado' });
    }

    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const clientData = {
      username,
      password: hashedPassword,
      email,
      name,
      clientType,
      googlePlaceId: place_id,
      location: {
        address,
        coordinates: [location.lng, location.lat],
      },
      rating,
      photos: photos.map((url) => ({ photoReference: url })),
      types,
    };

    let newClient;
    switch (clientType) {
      case 'Restaurante':
        newClient = new Restaurant(clientData);
        break;
      case 'Hotel':
        newClient = new Hotel(clientData);
        break;
      default:
        newClient = new Client(clientData);
    }
    await newClient.save();

    const payload = { clientId: newClient._id, name: newClient.name, email: newClient.email, clientType };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'Cliente registrado con éxito', token });
  } catch (error) {
    console.error('Error en el registro del cliente:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

exports.loginClient = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) return res.status(400).json({ message: 'El correo electrónico y la contraseña son obligatorios' });

    const client = await Client.findOne({ email });
    if (!client) return res.status(400).json({ message: 'Cliente no registrado' });
    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });

    const payload = { clientId: client._id, name: client.name, email: client.email, clientType: client.clientType };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error('Error en el inicio de sesión del cliente:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Retrieve all clients without photo URL formatting
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get client by ID without photo URL formatting
exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });

    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a client
exports.updateClient = async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedClient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a client
exports.deleteClient = async (req, res) => {
  try {
    const deletedClient = await Client.findByIdAndDelete(req.params.id);
    if (!deletedClient) return res.status(404).json({ message: 'Client not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get clients by type
exports.getClientsByType = async (req, res) => {
  try {
    const { clientType } = req.params;
    let clients;
    switch (clientType) {
      case 'Restaurant':
        clients = await Restaurant.find();
        break;
      case 'Hotel':
        clients = await Hotel.find();
        break;
      default:
        clients = await Client.find({ clientType });
    }
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};