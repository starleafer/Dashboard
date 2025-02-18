const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
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
  },
  userId: {
    type: String,
    required: true,
    index: true
  }
});

mongoose.connection.collections['tasks']?.drop();

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
