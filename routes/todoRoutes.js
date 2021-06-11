const { addNewTodo, getAllTodo, getTodoById, updateTodo, deleteTodo } = require("../controllers/todoController");

const express = require('express');
const router = express.Router();

router.get('/read', (req, res) => getAllTodo(req, res));

router.get("/read/:id", (req, res) => getTodoById);

router.post("/create", (req, res) => addNewTodo);

router.put("/update/:id", (req, res) => updateTodo);

router.delete("/delete/:id", (req, res) => deleteTodo);

module.exports = router;
