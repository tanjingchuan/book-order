const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TeachersSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  age:{
    type: Number,
    required: true
  },
  position:{
    type: String,
    required: true
  }, 
  academy:{
    type: String,
    required: true
  }
});

module.exports = Teachers = mongoose.model('teachers', TeachersSchema);
