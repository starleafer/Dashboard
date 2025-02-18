const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
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
  }
});

TodoSchema.set('toObject', { getters: true });
TodoSchema.set('toJSON', { getters: true });

module.exports = mongoose.model("Todo", TodoSchema);