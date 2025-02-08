const mongoose = require("mongoose");

const CalendarTaskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
    required: true
  }
});

module.exports = mongoose.model("CalendarTask", CalendarTaskSchema);
