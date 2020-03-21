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
  },
  evaluate: {
    type: Array,
    default: []
  }
});

module.exports = Books = mongoose.model('books', BooksSchema);
