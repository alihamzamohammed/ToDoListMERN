const {
  addNewTodo,
  getAllTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
} = require("../services/todoService");

const postTodo = async (req, res) => {
  let { status, response } = await addNewTodo(req);
  res.status(status).json(response);
};

const getTodos = async (req, res) => {
  let { status, response } = await getAllTodo();
  res.status(status).json(response);
};

const getTodo = async (req, res) => {
  let { status, response } = await getTodoById(req);
  res.status(status).json(response);
};

const putTodo = async (req, res) => {
  let { status, response } = await updateTodo(req);
  res.status(status).json(response);
};

const delTodo = async (req, res) => {
  let { status, response } = await deleteTodo(req);
  res.status(status).json(response);
};

module.exports = {
  postTodo,
  getTodos,
  getTodo,
  putTodo,
  delTodo,
};
