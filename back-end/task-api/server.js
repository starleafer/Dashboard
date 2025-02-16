require("dotenv").config({ path: "../../.env" });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000; 
const connectDB = require("./config/DBconfig");

connectDB();

const calendarRouter = require("./routes/calendarRoutes");

app.use(express.json());
app.use(cors());

app.use("/calendar-tasks", calendarRouter);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});