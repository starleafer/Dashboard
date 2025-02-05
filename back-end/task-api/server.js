require("dotenv").config({ path: "../../.env" });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const calendarRoutes = require("./routes/calendarRoutes");

const app = express();
const port = process.env.PORT || 5000; 
const connectDB = require("./config/DBconfig");

connectDB()
app.use(express.json());
app.use(cors());

app.get('/test', (req, res) => {
  res.json({ message: 'Server is working' });
});

const taskRouter = require("./routes/todo");
app.use("/tasks", taskRouter);
app.use("/calendar-tasks", calendarRoutes);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

