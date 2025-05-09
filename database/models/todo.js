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

// ✅ User 스키마
const users = new mongoose.Schema({
  userid: { type: String, required: true },
  userage: { type: String, required: true },
  nickname: { type: String, required: false },
  gender: { type: String, required: true },
  email: { type: String, required: false },
  password: { type: String, required: true },
  profileImage: { type: String, required: false },
  favoriteComs: { type: String, required: false },
  favoriteBooks: { type: String, required: true },
  favoriteCategorys: { type: String, required: false },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, required: false },
  friends: { type: String, required: false },
});
const User = mongoose.model('users', users);

// ✅ 각각 모델로 선언
const Todo = mongoose.model("Todo", todoSchema);
const Category = mongoose.model("categorys", categorys); //""안에 이름이 컬렉션 명이어야함

// ✅ 객체로 내보내기
module.exports = { Todo, User, Category };