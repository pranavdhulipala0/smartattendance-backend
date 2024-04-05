const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  college: {
    type: String,
    unique: true,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  Date: {
    type: String,
    unique: true,
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  total_time: {
    // type: Double,
  },
});

const Student = mongoose.model("students", StudentSchema);

module.exports = Student;
