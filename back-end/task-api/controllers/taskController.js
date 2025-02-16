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

exports.updateTask = async (req, res) => {
  try {
    const id = req.params.id;

    const currentTask = await Task.findById(id);
    if (!currentTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    const result = await Task.updateOne(
      { _id: id },
      {
        $set: {
          date: new Date(req.body.date),
          title: currentTask.title,
          completed: currentTask.completed,
        },
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Update failed" });
    }

    const updatedTask = await Task.findById(id);
    res.json(updatedTask);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: error.message });
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
