//Users.js
const mongoose = require("mongoose");


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

// ✅ 객체로 내보내기
module.exports = { User };