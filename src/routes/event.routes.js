const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");

// Route to create a new event
router.post("/", eventController.createEvent);

// Route to retrieve all events
router.get("/", eventController.getAllEvents);

module.exports = router;