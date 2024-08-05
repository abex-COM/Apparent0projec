const mongoose = require("mongoose");
const taskSchema = mongoose.Schema({
  summary: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("task", taskSchema);
