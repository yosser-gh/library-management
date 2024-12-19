const express = require("express");
const Loan = require("../models/Loan");
const Book = require("../models/Book");
const { verifyToken } = require("./auth"); // Middleware for authentication
const router = express.Router();


// Route to get books
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find().limit(20).skip(17);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books' });
  }
});


router.get('/books/category/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const books = await Book.find({
      Category: { $regex: new RegExp(`\\b${category}\\b`, "i") } 
    }).limit(20);
    res.json(books);
  } catch (error) {
    console.error("Error fetching books by category:", error);
    res.status(500).json({ message: 'Error fetching books by category.' });
  }
});



router.get('/books/:isbn', async (req, res) => {
  const { isbn } = req.params;
  try {
    const book = await Book.findOne({ ISBN: isbn });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book details' });
  }
});


// Loan a book
router.post("/books/loan", verifyToken, async (req, res) => {
  const { bookId } = req.body; // Book ID sent from the frontend
  const userId = req.user.id; // User ID from the token

  try {
    // Ensure the book exists
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found." });

    // Check if the book is already loaned
    const existingLoan = await Loan.findOne({ bookId, returnDate: null });
    if (existingLoan) return res.status(400).json({ message: "Book already loaned." });

    // Calculate the due date (e.g., 14 days from today)
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    // Create a new loan record
    const loan = new Loan({
      userId,
      bookId,
      dueDate,
    });

    await loan.save();
    res.status(201).json({ message: "Book loaned successfully.", loan });
  } catch (error) {
    console.error("Error loaning book:", error);
    res.status(500).json({ message: "Error loaning book." });
  }
});



module.exports = router;
