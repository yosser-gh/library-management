const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Event = require("../models/event");
const LoanedBook = require("../models/Loan");
const { verifyToken } = require("./auth");

// Fetch profile data
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found." });

    const registeredEvents = await Event.find({ attendees: user._id });
    const loanedBooks = await LoanedBook.find({ userId: user._id });

    res.status(200).json({
      user: {
        name: user.username,
        email: user.email,
        memberSince: user.createdAt,
        avatar: user.avatar || "https://via.placeholder.com/120",
      },
      registeredEvents,
      loanedBooks,
    });
  } catch (error) {
    console.error("Error fetching profile data:", error);
    res.status(500).json({ message: "Error fetching profile data." });
  }
});

module.exports = router;
