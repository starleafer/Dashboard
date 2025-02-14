const express = require("express");
const router = express.Router();
const calendarController = require("../controllers/calendarController");

router.get("/", calendarController.getTasks);
router.post("/", calendarController.createTask);
router.delete("/:id", calendarController.deleteTask);
router.put("/:id", calendarController.updateTask);

module.exports = router; 
