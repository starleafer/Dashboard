const express = require("express");
const router = express.Router();
const calendarController = require("../controllers/calendarController");

router.use((req, res, next) => {
  console.log('Calendar API Request:', req.method, req.path);
  next();
});

router.get("/", calendarController.getTasks);
router.post("/", calendarController.createTask);
router.put("/:id", calendarController.updateTask);
router.delete("/:id", calendarController.deleteTask);

module.exports = router; 
