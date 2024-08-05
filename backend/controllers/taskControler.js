const jwt = require("jsonwebtoken");
const taskModel = require("../models/taskModel");
const createtask = async (req, res) => {
  const { summary, description: description } = req.body;
  try {
    const result = await taskModel.create({
      summary,
      description,
    });
    
    res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};
const asyncHandler = require("express-async-handler");
const Task = require("../models/taskModel"); // Adjust the path as needed
// get All tasks
const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find().sort({ _id: -1 });
  res.status(200).json(tasks);
});

module.exports = {
  createtask,
  getAllTasks,
};
