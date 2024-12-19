const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const User = require("../models/user");
const { verifyToken } = require("./auth");

// Register for Event
router.post("/register-event", verifyToken, async (req, res) => {
  const { eventId } = req.body;

  try {
    // Find user and event
    const user = await User.findById(req.user.id);
    const event = await Event.findById(eventId);

    if (!user || !event) {
      return res.status(404).json({ message: "User or event not found." });
    }

    // Add event to user's registered events
    if (!user.registeredEvents.includes(eventId)) {
      user.registeredEvents.push(eventId);
      await user.save();
    }

    // Add user to event's registered users
    if (!event.registeredUsers.includes(user._id)) {
      event.registeredUsers.push(user._id);
      await event.save();
    }

    res.status(200).json({ message: "Successfully registered for the event." });
  } catch (error) {
    console.error("Error registering for event:", error);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
