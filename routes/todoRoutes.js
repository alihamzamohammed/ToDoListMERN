const { addNewTodo, getAllTodo, getTodoById, updateTodo, deleteTodo } = require("../controllers/todoController");

const express = require('express');
const router = express.Router();

router.get('/read', (req, res) => getAllTodo(req, res));

router.get("/read/:id", (req, res) => getTodoById(req, res));

router.post("/create", (req, res) => addNewTodo(req, res));

router.put("/update/:id", (req, res) => updateTodo(req, res));

router.delete("/delete/:id", (req, res) => deleteTodo(req, res));

module.exports = router;
