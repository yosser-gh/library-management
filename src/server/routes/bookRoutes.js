const express = require('express');
const Book = require('../models/Book'); // Import the Book model


const router = express.Router();

// Route to get books
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find().limit(20);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books' });
  }
});

module.exports = router;
