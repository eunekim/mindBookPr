//categoryController.js
const { Category } = require("../models/Category");

//1번째 선호도 질문
const getFirstCategorys = async (req, res, next) => {
  const groupId = req.query.groupId;
  const todos = await Category.find(
    { class: 0 },
    { name: 1, number : 1 , _id: 0 }
  ).exec();
  res.json(todos);
};

//2번째 선호도 질문
const getSecondCategorys = async (req, res, next) => {
  try {
    const parentNumber = parseInt(req.query.number, 10); // 대분류 값 number 받음
    const subCategories = await Category.find(
      { category: 0, number: parentNumber, class: { $ne: 0 } },
      { name: 1, number: 1, class: 1, _id: 0 }
    ).exec();

    res.json(subCategories);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
dsds
//3번째 선호도 질문
const getThirdCategorys = async (req, res, next) => {
  try {
    const parentNumber = parseInt(req.query.number, 10); // 대분류 값 number 받음
    const parentClass = parseInt(req.query.class, 10); // 중분류 값 class 받음

    const subCategories = await Category.find(
      { class: parentClass, number: parentNumber, category: 1 },
      { name: 1, number: 1, class:1, _id: 0 }
    ).exec();

    res.json(subCategories);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

module.exports = { getFirstCategorys, getSecondCategorys, getThirdCategorys };