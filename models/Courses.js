const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CoursesSchema = new Schema({
  course_id:{
    type: Number,
    required: true
  },
  name:{
    type: String,
    required: true
  },
  teacher_name:{
    type: String,
    required: true
  },
  grade:{
    type: String,
    required: true
  },
  book_command:{
    type: String,
    required: true
  }
});

module.exports = Courses = mongoose.model('courses', CoursesSchema);
