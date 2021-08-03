/**
 * Service functions for todo
 */

const Todo = require("../models/todoModel");

/**
 * Saves new todo to database
 * @param {express.Request} req Indicates contents of new todo
 * @returns {Object} Object with correct status and database response
 */
const addNewTodo = async (req) => {
  try {
    let newTodo = new Todo(req.body);
    let res = await newTodo.save();
    return { status: 200, response: res };
  } catch (err) {
    return { status: 500, response: err };
  }
};

/**
 * Gets all todos from database
 * @returns {Object} Object with correct status and database response
 */
const getAllTodo = async () => {
  try {
    let todos = await Todo.find({}).populate("category");
    return { status: 200, response: todos };
  } catch (err) {
    return { status: 500, response: err };
  }
};

/**
 * Gets specific ctegory by ID
 * @param {express.Request} req Indicates ID of todo
 * @returns {Object} Object with correct status and database response
 */
const getTodoById = async (req) => {
  try {
    let todo = await Todo.findById(req.params.id).populate("category");
    return { status: 200, response: todo };
  } catch (err) {
    return { status: 404, response: err };
  }
};

/**
 * Updates todo by ID with specified contents
 * @param {express.Request} req Indicates ID and new contents of todo
 * @returns {Object} Object with correct status and database response
 */
const updateTodo = async (req) => {
  try {
    let todo = await Todo.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      useFindAndModify: false,
    }).populate("todo");
    return { status: 200, response: todo };
  } catch (err) {
    return { status: 500, response: err };
  }
};

/**
 * Deletes todo by ID
 * @param {express.Request} req Indicates ID of todo
 * @returns {Object} Object with correct status and database response
 */
const deleteTodo = async (req) => {
  try {
    let deleted = await Todo.deleteOne({ _id: req.params.id });
    return { status: 200, response: deleted };
  } catch (err) {
    return { status: 500, response: err };
  }
};

module.exports = {
  addNewTodo,
  getAllTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
};
