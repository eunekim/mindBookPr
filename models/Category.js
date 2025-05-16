//Category.js
const mongoose = require("mongoose");

// ✅ Category 스키마
const categorys = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: Number, required: true }, // 🔁 Boolean → Number 수정
  class: { type: Number, required: true },
});

const Category = mongoose.model("categorys", categorys); //""안에 이름이 컬렉션 명이어야함

// ✅ 객체로 내보내기
module.exports = { Category };
