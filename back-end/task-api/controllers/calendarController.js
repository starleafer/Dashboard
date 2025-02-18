const Task = require("../models/CalendarTasks.js");  

exports.getTasks = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log('Getting tasks for user:', userId);
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    const tasks = await Task.find({ userId });
    console.log('Found tasks:', tasks);
    res.json(tasks);
  } catch (error) {
    console.error('Error getting tasks:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, date, userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    
    const task = new Task({
      title,
      date: new Date(date),
      completed: false,
      userId
    });
    
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const task = await Task.findOneAndDelete({ _id: req.params.id, userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }
    
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, userId }, 
      req.body,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found or unauthorized" });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};