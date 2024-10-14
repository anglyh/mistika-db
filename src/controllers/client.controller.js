require('dotenv').config();
const { Client, Restaurant, Hotel } = require('../models/client.model');

// Create a new client
exports.createClient = async (req, res) => {
  try {
    let newClient;
    switch (req.body.clientType) {
      case 'Restaurant':
        newClient = new Restaurant(req.body);
        break;
      case 'Hotel':
        newClient = new Hotel(req.body);
        break;
      default:
        newClient = new Client(req.body);
    }
    const savedClient = await newClient.save();
    res.status(201).json(savedClient);
  } catch (error) {
    res.status(400).json({ message: error.message });
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