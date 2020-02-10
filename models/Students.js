const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const StudentsSchema = new Schema({
  stu_id:{
    type: Number,
    required: true
  },
  name:{
    type: String,
    required: true
  },
  grade:{
    type: String,
    required: true
  },
  academy:{
    type: String,
    required: true
  },
  major:{
    type: String,
    required: true
  },
  class:{
    type: String,
    required: true
  },
  courses:[],
  order_courses: []
});

module.exports = Students = mongoose.model('students', StudentsSchema);
