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
    await CalendarTask.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    console.log('Update request received:', {
      taskId: req.params.id,
      body: req.body
    });

    const task = await CalendarTask.findById(req.params.id);
    if (!task) {
      console.log('Task not found');
      return res.status(404).json({ message: "Task not found" });
    }

    console.log('Current task state:', {
      id: task._id,
      completed: task.completed,
      title: task.title
    });

    task.completed = req.body.completed; 
    if (req.body.title) {
      task.title = req.body.title;
    }

    console.log('About to save task with new state:', {
      id: task._id,
      completed: task.completed,
      title: task.title
    });

    const updatedTask = await task.save();

    
    console.log('Task updated successfully:', {
      id: updatedTask._id,
      completed: updatedTask.completed,
      title: updatedTask.title
    });
    
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: error.message });
  }
};
