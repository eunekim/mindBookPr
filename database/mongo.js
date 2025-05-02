const mongoose = require("mongoose");
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



const getCategorys = async (req, res, next) => {
  const groupId = req.query.groupId;
  const todos = await Category.find(
    { number: 1, class: 1 },
    { name: 1, _id: 0 }
  ).exec();
  res.json(todos);
};
exports.getCategorys = getCategorys;
