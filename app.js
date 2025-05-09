// app.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const bodyParser = require("body-parser");
const mongoController = require("./database/mongo");
const { Console } = require('console');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // ← JSON 본문 파싱 필수
app.use(express.urlencoded({ extended: true }));


// 루트 경로에서 index.html 제공
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get("/api/getFirstCategorys", mongoController.getFirstCategorys);
app.get("/api/getSecondCategorys", mongoController.getSecondCategorys);
app.get("/api/getThirdCategorys", mongoController.getThirdCategorys);

app.get('/api/getFamousWorks', async (req, res) => {
  console.log("1", req.query.name);
  const category = req.query.name;
  console.log("1", category);
  if (!category) {
    return res.status(400).json({ error: 'Category is required' });
  }

  //mongo.js 함수로 카테고리 값 갖고 연결
  const works = await mongoController.getFamousWorks(category);
  res.json({ works });
});

app.get('/api/saveSelectedBook', async (req, res) => {
  console.log("1", req.query.name);
  const category = req.query.name;
  console.log("1", category);
  if (!category) {
    return res.status(400).json({ error: 'Category is required' });
  }

  //mongo.js 함수로 카테고리 값 갖고 연결
  const works = await mongoController.getFamousWorks(category);
  res.json({ works });
});

app.post("/api/saveUserInfo", async (req, res, next) => {
  await mongoController.joinSuccess(req, res, next);
});


// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});