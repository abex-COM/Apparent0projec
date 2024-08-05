const express = require("express");
const { auth, adminMiddleware } = require("../middleWare/authWare ");
const { createtask } = require("../controllers/taskControler");
const { getAllTasks } = require("../controllers/taskControler");
const router = express.Router();

router.post("/createtask", auth, adminMiddleware, createtask);
router.get("/get", getAllTasks);

module.exports = router;
