const CalendarTask = require("../models/CalendarTasks");

exports.getTasks = async (req, res) => {
  try {
    console.log("Fetching tasks from database...");
    const tasks = await CalendarTask.find();
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
    const task = new CalendarTask({
      title: req.body.title,
      date: new Date(req.body.date),
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
    await CalendarTask.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
