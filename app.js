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


// Route to handle requests for famous works based on category
app.get('/api/getFamousWorks', async (req, res) => {
  console.log("1", req.query.name);
<<<<<<< HEAD

=======
>>>>>>> 242a85446f79b0a5b1ba9ee23f842b582b875ea7
  const category = req.query.name;
  console.log("1", category);
  if (!category) {
    return res.status(400).json({ error: 'Category is required' });
  }

<<<<<<< HEAD
  const works = await mongoController.getFamousWorks(category);
  res.json({ works });
});


=======
  //mongo.js 함수로 카테고리 값 갖고 연결
  const works = await mongoController.getFamousWorks(category);
  res.json({ works });
});
>>>>>>> 242a85446f79b0a5b1ba9ee23f842b582b875ea7

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});