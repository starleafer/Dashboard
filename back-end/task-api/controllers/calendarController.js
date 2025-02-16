const Task = require("../models/CalendarTasks.js");  

exports.getTasks = async (req, res) => {
  try {
    console.log("Fetching tasks from database...");
    const tasks = await Task.find();
    console.log("Tasks found:", tasks);
    res.json(tasks);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    console.log("Creating new task:", req.body);
    const task = new Task({
      title: req.body.title,
      date: new Date(req.body.date),
      completed: req.body.completed || false 
    });
    const newTask = await task.save();
    console.log("Task created:", newTask);
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        date: new Date(req.body.date),
        completed: req.body.completed
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: error.message });
  }
};