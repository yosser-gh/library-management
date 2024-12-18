const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// Fetch all events
router.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Error fetching events." });
  }
});

// Fetch event by ID
router.get("/events/:id", async (req, res) => {
    try {
      const event = await Event.findById(req.params.id); // Fetch event by ID
      if (!event) {
        return res.status(404).json({ message: "Event not found." });
      }
      res.status(200).json(event);
    } catch (error) {
      console.error("Error fetching event:", error);
      res.status(500).json({ message: "Error fetching event." });
    }
  });
  


module.exports = router;
