require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
  } catch (error) {
    console.error("Error connecting to the database. \n", error);
  }
};

connectDB(); // connect to the database
app.use(cors()); // to allow cross-origin requests
app.use(express.json()); // to parse the body of the request

const Todo = require("./models/Todo");

app.get("/tasks", async (req, res) => {
  try {
    res.json(await Todo.find({}));
  } catch (error) {
    console.error("Error fetching tasks. \n", error);
  }
});

app.get("/tasks/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    res.json(await Todo.findById(req.params.id));
  } catch (error) {
    console.error("Error fetching task. \n", error);
  }
});

app.post("/tasks", async (req, res) => {
  console.log(req.body);
  try {
    const newTask = new Todo({
      title: req.body.title,
      date: req.body.date,
    });
    res.send(await newTask.save());
  } catch (error) {
    console.error("Error creating task. \n", error);
    res.status(500).send("Error creating task.");
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const updatedTask = await Todo.findByIdAndUpdate(req.params.id, req.body, {
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
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const deletedTask = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully", task: deletedTask });
  } catch (error) {
    console.error("Error deleting task. \n", error);
    res.status(500).send("Error deleting task.");
  }
});

// checks if app is running
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
