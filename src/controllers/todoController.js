/**
 * Express controller for todos
 */
const {
  addNewTodo,
  getAllTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
} = require("../services/todoService");

/**
 * POST request handler for todo
 * Returns status and response from addNewTodo service function
 * @param {express.Request} req Incoming request
 * @param {express.Response} res Outgoing response
 */
const postTodo = async (req, res) => {
  let { status, response } = await addNewTodo(req);
  res.status(status).json(response);
};

/**
 * GET request handler for all todos
 * Returns status and response from getAllTodo service function
 * @param {express.Request} req Incoming request
 * @param {express.Response} res Outgoing response
 */
const getTodos = async (req, res) => {
  let { status, response } = await getAllTodo();
  res.status(status).json(response);
};

/**
 * GET request handler for specific todo
 * Returns status and response from getTodoById service function
 * @param {express.Request} req Incoming request
 * @param {express.Response} res Outgoing response
 */
const getTodo = async (req, res) => {
  let { status, response } = await getTodoById(req);
  res.status(status).json(response);
};

/**
 * PUT request handler for todo
 * Returns status and response from updateTodo service function
 * @param {express.Request} req Incoming request
 * @param {express.Response} res Outgoing response
 */
const putTodo = async (req, res) => {
  let { status, response } = await updateTodo(req);
  res.status(status).json(response);
};

/**
 * DELETE request handler for todo
 * Returns status and response from deleteTodo service function
 * @param {express.Request} req Incoming request
 * @param {express.Response} res Outgoing response
 */
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
