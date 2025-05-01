// const express = require( 'express' );
// const app = express();
// const port = 8000;

// // ejs 문법 사용 가능
// app.set("view engine", "ejs");
// app.set("views", __dirname + "/views");

// // app.get('/', (req, res) => {
// //     res.send('하이')
// //   });
  
// // app.get('/test', (req, res) => {
// //     res.render('test', {parameter1: 5, parameter2: '이지수'});
// // });
  
// // app.listen(port, () => {
// // console.log('8000!');
// // });

// // app.listen(port, () => {
// //   console.log('8000!');
// // });

// // const body = require( 'body-parser' );
// app.use( express.urlencoded( { extended:false } ) );
// app.use( express.json() );

// app.get('/form', (req, res) => {
// 	console.log(req.query); // GET 정보
// 	console.log(req.query.name);
//     console.log(req.query.age);
//     res.render('form');
// });

// app.post('/form', (req, res) => { 
// 	console.log(req.method);
// 	console.log(req.body); // POST 정보
// 	console.log(req.body.name);
//     console.log(req.body.age);
// 	console.log("post form 들어옴");
//     res.send("good");
// });

// // const express = require('express');

// // app.use(express.urlencoded({ extended: true }));

// // app.use(express.json());



// const express = require('express'); // express 임포트
// const app = express(); // app생성
// const port = 5000;

// app.get('/', function (req, res) {
//   res.send('hello world!!');
// });

// app.listen(port, () => console.log(`${port}포트입니다.`));

// // 몽구스 연결
// const mongoose = require('mongoose');
// mongoose
//   .connect(
//     'mongodb+srv://keh8992:XmRCdTJR5A6wM84n@mindbook.oialmyx.mongodb.net/?retryWrites=true&w=majority&appName=MindBook',
//     {
//       // useNewUrlPaser: true,
//       // useUnifiedTofology: true,
//       // useCreateIndex: true,
//       // useFindAndModify: false,
//     }
//   )
//   .then(() => console.log('MongoDB conected'))
//   .catch((err) => {
//     console.log(err);
//   });




// const MongoClient = require("mongodb").MongoClient;

// const url =
//   "mongodb+srv://keh8992:XmRCdTJR5A6wM84n@mindbook.oialmyx.mongodb.net/?retryWrites=true&w=majority&appName=MindBook";

//   const createTodo = async (req, res, next) => {
// 	const newTodo = {
// 	  text: req.body.text,
// 	  id: req.body.id,
// 	  isDone: req.body.isDone,
// 	  groupId: req.body.groupId,
// 	  dueDate: req.body.dueDate,
// 	  createDate: req.body.createDate,
// 	};
// 	const client = new MongoClient(url);
  
// 	try {
// 	  const db = client.db("todos_test");
// 	  const todos = db.collection("todos");
// 	  const result = await todos.insertOne(newTodo);
// 	} catch (error) {
// 	  return res.json({ message: "Fail to store data." });
// 	}
  
// 	client.close();
// 	res.json(newTodo);
//   };

// const getTodos = async (req, res, next) => {
    
// }

// exports.createTodo = createTodo;
// exports.getTodos = getTodos;


// const express = require("express");
// const app = express();

// app.use(express.json()); // JSON 바디 파싱
// app.use(express.urlencoded({ extended: true })); // 폼 데이터 파싱 (선택적)

// const mongoDB = require("./database/mongo");

// app.post("/todos", mongoDB.createTodo);

// app.get("/todos", mongoDB.getTodos);

// app.listen(5000, () => console.log("Server is running at 5000 ✨"));


// const express = require("express");
// const app = express();
// const mongoDB = require("./database/mongo");

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.post("/todos", mongoDB.createTodo);
// app.get("/todos", mongoDB.getTodos);

// app.listen(5000, () => console.log("Server is running at 5000 ✨"));



// const express = require( 'express' );
// const app = express();
// const port = 8000;

// // ejs 문법 사용 가능
// app.set("view engine", "ejs");
// app.set("views", __dirname + "/views");

// app.get('/', (req, res) => {
//     res.send('index');
//   });





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


// ✅ API 라우터 설정
app.get('/api/todos', mongoController.getTodos);       // 전체 Todo 목록
app.post('/api/todos', mongoController.createTodo);    // 새 Todo 추가

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});





