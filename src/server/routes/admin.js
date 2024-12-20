const express = require("express");
const { verifyToken } = require("./auth");
const User = require("../models/user");
const Book = require("../models/Book");
const Event = require("../models/Event");
const Loan = require("../models/Loan");
const router = express.Router();
const bcrypt = require("bcrypt");

// Middleware to ensure admin access
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied." });
  }
  next();
};

router.use(verifyToken, isAdmin);

// Statistics Dashboard
router.get('/statistics', async (req, res) => {
  try {
    const userCount = await User.countDocuments({ role: { $ne: 'admin' } });
    const bookCount = await Book.countDocuments();
    const eventCount = await Event.countDocuments();
    const loanCount = await Loan.countDocuments({ returnDate: null });
    const overdueLoanCount = await Loan.countDocuments({
      returnDate: null,
      dueDate: { $lt: new Date() }
    });

    res.json({
      userCount,
      bookCount,
      eventCount,
      loanCount,
      overdueLoanCount
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics' });
  }
});


// Admin Profile
router.get('/profile', async (req, res) => {
  try {
    const adminProfile = await User.findById(req.user._id).select('-password');
    res.json(adminProfile);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admin profile' });
  }
});

router.put('/profile', async (req, res) => {
  try {
    const { password, ...updateData } = req.body;
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }
    const updatedProfile = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true }
    ).select('-password');
    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: 'Error updating admin profile' });
  }
});

// Recent Books
router.get('/books/recent', async (req, res) => {
  try {
    const recentBooks = await Book.find()
      .sort({ createdAt: -1 })
      .limit(5);
    res.json(recentBooks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recent books' });
  }
});

// User Management
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: 'admin' } }).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

router.post('/user', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: 'user'
    });
    await newUser.save();
    
    const userResponse = { ...newUser.toObject() };
    delete userResponse.password;
    res.status(201).json(userResponse);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

router.put('/user/:id', async (req, res) => {
  const { password, ...updateData } = req.body;
  if (password) {
    updateData.password = await bcrypt.hash(password, 10);
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    ).select('-password');
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user." });
  }
});


router.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});


router.get("/event/:id/users", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("registeredUsers");
    res.json(event.registeredUsers);
  } catch (error) {
    console.error("Error fetching registered users for event:", error);
    res.status(500).send("Internal Server Error");
  }
});


// Book Management
router.get('/books/search', async (req, res) => {
  try {
    const { query, page = 1, limit = 5 } = req.query;
    const searchQuery = {
      $or: [
        { Title: { $regex: query, $options: 'i' } },
        { Authors: { $regex: query, $options: 'i' } },
        { ISBN: { $regex: query, $options: 'i' } }
      ]
    };

    const books = await Book.find(searchQuery)
      .limit(limit)
      .skip((page - 1) * limit);
    
    const total = await Book.countDocuments(searchQuery);

    res.json({
      books,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Error searching books' });
  }
});

router.post('/book', async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Error adding book' });
  }
});

router.put('/book/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: 'Error updating book' });
  }
});

router.delete('/books/:id', async (req, res) => {
  try {
    await Loan.deleteMany({ bookId: req.params.id });
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book and associated loans deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book." });
  }
});


// Event Management
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find()
      .sort({ date: 1 })
      .populate('registeredUsers', 'username email');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events' });
  }
});

router.post('/event', async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error creating event' });
  }
});

router.put('/event/:id', async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating event' });
  }
});

router.delete('/events/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event' });
  }
});

// Loan Management
router.get('/loans', async (req, res) => {
  try {
    const loans = await Loan.find()
      .populate('userId', 'username email')
      .populate('bookId', 'Title Authors ISBN')
      .sort({ dueDate: 1 });
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loans' });
  }
});

router.post('/loan', async (req, res) => {
  try {
    const newLoan = new Loan(req.body);
    await newLoan.save();
    res.status(201).json(newLoan);
  } catch (error) {
    res.status(500).json({ message: 'Error creating loan' });
  }
});

router.put('/loan/:id', async (req, res) => {
  try {
    const updatedLoan = await Loan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .populate('userId', 'username email')
      .populate('bookId', 'Title Authors ISBN');
    res.json(updatedLoan);
  } catch (error) {
    res.status(500).json({ message: 'Error updating loan' });
  }
});

router.delete('/loans/:id', async (req, res) => {
  try {
    await Loan.findByIdAndDelete(req.params.id);
    res.json({ message: 'Loan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting loan' });
  }
});

module.exports = router;