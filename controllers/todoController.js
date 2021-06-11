const mongoose = require("mongoose");
const todoSchema = require("../models/todoModel");

var Todo = mongoose.model("Todo", todoSchema);

const addNewTodo = (req, res) => {
    let newTodo = new Todo(req.body);
    newTodo.save((err, todoRes) => {
        if (err) {
            res.send(err);
        }
        res.json(todoRes);
    });
};

const getAllTodo = (req, res) => {
    Todo.find({}, (err, todos) => {
        if (err) {
            res.send(err);  
        }
        res.json(todos);
    });
};

const getTodoById = (req, res) => {
    Todo.findById(req.params.id, (err, todoFound) => {
        if (err) {
            res.send(err);
        }
        res.json(todoFound);
    });
};

const updateTodo = (req, res) => {
    Todo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, useFindAndModify: false }, (err, todoUpdated) => {
        if (err) {
            res.send(err);
        }
        res.json(todoUpdated);
    });
};

const deleteTodo = (req, res) => {
    Todo.deleteOne({ _id: req.params.id }, (err, deleted) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: "Successfully deleted todo", object: deleted });
    });
};

module.exports = { addNewTodo, getAllTodo, getTodoById, updateTodo, deleteTodo }