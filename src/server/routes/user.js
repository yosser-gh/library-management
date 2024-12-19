const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Event = require("../models/Event");
const Loan = require("../models/Loan");
const Book = require("../models/Book");  // Make sure to import Book model
const { verifyToken } = require("./auth");

// Fetch profile data
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('registeredEvents');
    
    if (!user) return res.status(404).json({ message: "User not found." });

    // Fetch loans with populated book details
    const loanedBooks = await Loan.find({ userId: user._id })
    .populate({
      path: 'bookId',
      select: 'Title Authors'  // Explicitly select the fields we need
    });

    // Transform loan data to include book details
    const transformedLoans = loanedBooks.map(loan => ({
      _id: loan._id,
      title: loan.bookId.Title,
      author: loan.bookId.Authors,
      loanDate: loan.loanDate,
      dueDate: loan.dueDate,
      isOverdue: new Date(loan.dueDate) < new Date() && !loan.returnDate
    }));

    res.status(200).json({
      user: {
        name: user.username,
        email: user.email,
        memberSince: user.createdAt,
        avatar: user.avatar || "https://via.placeholder.com/120",
        role: user.role,
        isVerified: user.isVerified
      },
      registeredEvents: user.registeredEvents || [],
      loanedBooks: transformedLoans,
    });
  } catch (error) {
    console.error("Error fetching profile data:", error);
    res.status(500).json({ message: "Error fetching profile data." });
  }
});

// Update profile
router.put("/profile", verifyToken, async (req, res) => {
  try {
    const { username, email, currentPassword, newPassword, avatar } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // If updating password, verify current password
    if (newPassword && currentPassword) {
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Current password is incorrect." });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }

    // Update other fields if provided
    if (username) user.username = username;
    if (email) user.email = email;
    if (avatar) user.avatar = avatar;

    await user.save();

    res.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile." });
  }
});



// Remove event registration
router.delete("/events/:eventId", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const eventId = req.params.eventId;

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Remove event from user's registered events
    await User.findByIdAndUpdate(user._id, {
      $pull: { registeredEvents: eventId }
    });

    // Remove user from event's attendees
    await Event.findByIdAndUpdate(eventId, {
      $pull: { attendees: user._id }
    });

    res.json({ message: "Event registration removed successfully" });
  } catch (error) {
    console.error("Error removing event:", error);
    res.status(500).json({ message: "Error removing event registration." });
  }
});

// Return a loaned book
router.delete("/loans/:loanId", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const loanId = req.params.loanId;

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update loan with return date
    const loan = await Loan.findOneAndUpdate(
      { _id: loanId, userId: user._id },
      { returnDate: new Date() },
      { new: true }
    );

    if (!loan) {
      return res.status(404).json({ message: "Loan not found." });
    }

    res.json({ message: "Book returned successfully" });
  } catch (error) {
    console.error("Error returning book:", error);
    res.status(500).json({ message: "Error returning book." });
  }
});


module.exports = router;