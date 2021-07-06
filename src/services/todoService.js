const mongoose = require("mongoose");
const todoSchema = require("../models/todoModel");

var Todo = mongoose.model("Todo", todoSchema);

const addNewTodo = async (req) => {
  try {
    let newTodo = new Todo(req.body);
    let res = await newTodo.save();
    return { status: 200, response: res };
  } catch (err) {
    return { status: 500, response: err };
  }
};

const getAllTodo = async () => {
  try {
    let categories = await Todo.find({}).populate("category");
    return { status: 200, response: categories };
  } catch (err) {
    return { status: 500, response: err };
  }
};

const getTodoById = async (req) => {
  try {
    let todo = await Todo.findById(req.params.id).populate("category");
    return { status: 200, response: todo };
  } catch (err) {
    return { status: 404, response: err };
  }
};

const updateTodo = async (req) => {
  try {
    let todo = await Todo.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      useFindAndModify: false,
    }).populate("category");
    return { status: 200, response: todo };
  } catch (err) {
    return { status: 500, response: err };
  }
};

const deleteTodo = async (req) => {
  try {
    let deleted = Todo.deleteOne({ _id: req.params.id });
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
