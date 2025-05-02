//todo.js
const mongoose = require("mongoose");

// ✅ Todo 스키마
const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isDone: { type: Boolean, required: true },
  groupId: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  createDate: { type: Date, required: true },
});

// ✅ Category 스키마
const categorys = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true }, // 🔁 Boolean → Number 수정
  class: { type: Number, required: true },
});

// ✅ 각각 모델로 선언
const Todo = mongoose.model("Todo", todoSchema);
const Category = mongoose.model("categorys", categorys); //""안에 이름이 컬렉션 명이어야함

// ✅ 객체로 내보내기
module.exports = { Todo, Category };