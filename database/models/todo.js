const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isDone: { type: Boolean, required: true },
  groupId: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  createDate: { type: Date, required: true },
});

module.exports = mongoose.model("Todo", todoSchema);