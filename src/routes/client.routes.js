const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client.controller');

router.post('/register', clientController.registerClient);
router.post('/login', clientController.loginClient);
router.get('/', clientController.getAllClients);
router.get('/:id', clientController.getClientById);
router.put('/:id', clientController.updateClient);
router.delete('/:id', clientController.deleteClient);

module.exports = router;
