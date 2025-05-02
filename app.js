// app.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const bodyParser = require("body-parser");
const mongoController = require("./database/mongo");

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());


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

app.get("/api/categories", mongoController.getCategorys);

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});