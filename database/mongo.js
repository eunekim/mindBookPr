// const MongoClient = require("mongodb").MongoClient;

// const url =
//   "mongodb+srv://keh8992:XmRCdTJR5A6wM84n@mindbook.oialmyx.mongodb.net/todos_test?retryWrites=true&w=majority&appName=MindBook";

// const createTodo = async (req, res, next) => {
// const newTodo = {
//     text: req.body.text,
//     id: req.body.id,
//     isDone: req.body.isDone,
//     groupId: req.body.groupId,
//     dueDate: req.body.dueDate,
//     createDate: req.body.createDate,
// };
// const client = new MongoClient(url);

// try {
//     const db = client.db("todos_test");
//     const todos = db.collection("todos");
//     const result = await todos.insertOne(newTodo);
// } catch (error) {
//     return res.json({ message: "Fail to store data." });
// }

// client.close();
// res.json(newTodo);
// };


// const getTodos = async (req, res, next) => {
//     const client = new MongoClient(url);
//     let todos;
//     try {
//         const db = client.db("todos_test");
//         const todos_collection = db.collection("todos");
//         todos = await todos_collection.find().toArray();
//     } catch (error) {
//         return res.json({ message: "Fail to retrieve data." });
//     }

//     client.close();
//     res.json(todos);
// };

// exports.createTodo = createTodo;
// exports.getTodos = getTodos;

// console.log("DB!!");



const mongoose = require("mongoose");

const Todo = require("./models/todo");

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

const getTodos = async (req, res, next) => {
    const todos = await Todo.find().exec();
    res.json(todos);
}

exports.getTodos = getTodos;
exports.createTodo = createTodo;