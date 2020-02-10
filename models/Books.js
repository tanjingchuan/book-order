const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const BooksSchema = new Schema({
    textbook_id:{
    type: Number,
    required: true
  },
  name:{
    type: String,
    required: true
  },
  publish_house:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  }
});

module.exports = Books = mongoose.model('books', BooksSchema);
