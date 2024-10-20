const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client.controller');

// Route to create a new client
router.post('/register', clientController.registerClient);

router.post('/login', clientController.loginClient);

// Route to retrieve all clients
router.get('/', clientController.getAllClients);

// Route to retrieve a single client by ID
router.get('/:id', clientController.getClientById);

// Route to update a client
router.put('/:id', clientController.updateClient);

// Route to delete a client
router.delete('/:id', clientController.deleteClient);

module.exports = router;
