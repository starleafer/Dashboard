require("dotenv").config({ path: "../../.env" });
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const mongoose = require("mongoose");
const connectDB = require("./config/DBconfig");


connectDB()
app.use(express.json());
app.use(cors());

const taskRouter = require("./routes/todo");
app.use("/tasks", taskRouter);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});

