const Task = require("../models/Todo.js");

module.exports.fetchAllTasks = async (req, res) => {
  try {
    res.json(await Task.find({}));
  } catch (error) {
    console.error("Error fetching tasks. \n", error);
  }
};

module.exports.fetchTask = async (req, res) => {
  try {
    res.json(await Task.findById(req.params.id));
  } catch (error) {
    console.error("Error fetching task. \n", error);
  }
};

module.exports.createTask = async (req, res) => {
  try {
    const newTask = new Task({
      title: req.body.title,
      date: req.body.date,
    });
    res.send(await newTask.save());
  } catch (error) {
    console.error("Error creating task. \n", error);
    res.status(500).send("Error creating task.");
  }
};

module.exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error("Error updating task. \n", error);
    res.status(500).send("Error updating task.");
  }
};

module.exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully", task: deletedTask });
  } catch (error) {
    console.error("Error deleting task. \n", error);
    res.status(500).send("Error deleting task.");
  }
};
