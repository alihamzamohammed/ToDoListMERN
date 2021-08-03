/**
 * Defined routes for Todo
 */

const {
  postTodo,
  getTodos,
  getTodo,
  putTodo,
  delTodo,
} = require("../controllers/todoController");

const express = require("express");
const router = express.Router();

/** Read all todos route */
router.get("/read", (req, res) => getTodos(req, res));

/** Read specific todo by ID route */
router.get("/read/:id", (req, res) => getTodo(req, res));

/** Create todo route */
router.post("/create", (req, res) => postTodo(req, res));

/** Update todo route */
router.put("/update/:id", (req, res) => putTodo(req, res));

/** Delete todo route */
router.delete("/delete/:id", (req, res) => delTodo(req, res));

module.exports = router;
