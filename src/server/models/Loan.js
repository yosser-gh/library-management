const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }, // Reference to Book model
  loanDate: { type: Date, default: Date.now }, // Date when the book was loaned
  dueDate: { type: Date, required: true }, // Due date for returning the book
  returnDate: { type: Date }, // Optional: Date when the book was returned
});

module.exports = mongoose.model('Loan', loanSchema);
