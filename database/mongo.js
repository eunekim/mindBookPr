//mongo.js
const mongoose = require("mongoose");
const axios = require('axios');
const { Todo, Category } = require("./models/todo");

mongoose
  .connect(
    "mongodb+srv://keh8992:XmRCdTJR5A6wM84n@mindbook.oialmyx.mongodb.net/todos_test?retryWrites=true&w=majority&appName=MindBook"
  )
  .then(() => console.log("Connected to database!"))
  .catch(() => console.log("Connection failed..."));

const createTodo = async (req, res, next) => {
  const newTodo = new Todo({
    text: req.body.text,
    isDone: req.body.isDone,
    groupId: req.body.groupId,
    dueDate: req.body.dueDate,
    createDate: req.body.createDate,
  });

  const result = await newTodo.save();

  res.json(result);
};
exports.createTodo = createTodo;

//1번째 선호도 질문
const getFirstCategorys = async (req, res, next) => {
  const groupId = req.query.groupId;
  const todos = await Category.find(
    { class: 0 },
    { name: 1, number : 1 , _id: 0 }
  ).exec();
  res.json(todos);
};
exports.getFirstCategorys = getFirstCategorys;

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
exports.getSecondCategorys = getSecondCategorys;

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
exports.getThirdCategorys = getThirdCategorys;




// OpenAI API 키 설정
const OPENAI_API_KEY = '***REMOVED***proj-QzOBkeBJ6Ji0iZVRKu7CWoIDWNPelBy1sZkBjzouZlXIDOhAbuLarQaQ6k2nEn3NBLJ_yQsjRFT3BlbkFJxZQYNHCJsdqiQCRJrJOTOITYu_AHuVaB9_2My2OcuvAaB0_MkUIO9qZtqwLZIHc3eW72YlkjIA';  // 여기에 본인의 API 키를 입력

// AI에 질문을 보내고 작품 리스트를 받아오는 함수
const getFamousWorks = async (category) => {
  console.log("req.query:");

  const prompt = `${category}로 유명한 작품 리스트를 알려줘`;

  try {
    console.log("오냐");

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 100,
      temperature: 0.7,
    }, {
      headers: {
        'Authorization': `Bearer ***REMOVED***proj-QzOBkeBJ6Ji0iZVRKu7CWoIDWNPelBy1sZkBjzouZlXIDOhAbuLarQaQ6k2nEn3NBLJ_yQsjRFT3BlbkFJxZQYNHCJsdqiQCRJrJOTOITYu_AHuVaB9_2My2OcuvAaB0_MkUIO9qZtqwLZIHc3eW72YlkjIA`,
        'Content-Type': 'application/json',
      },
    });

    console.log("오냐");

    const text = response.data.choices[0].text.trim();
    const works = text.split('\n').map(item => item.trim());
    return works;
  } catch (error) {
    console.error('Error fetching data from OpenAI:', error);
    return [];
  }
};
exports.getFamousWorks = getFamousWorks;

