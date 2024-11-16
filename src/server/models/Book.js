const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  ISBN: String,
  Title: String,
  Publisher: String,
  "Image-URL-S": String,
  "Image-URL-M": String,
  "Image-URL-L": String,
  Authors: String,
  Description: String,
  Category: String,
  "Publish Date": String,
});

module.exports = mongoose.model('Book', bookSchema);


