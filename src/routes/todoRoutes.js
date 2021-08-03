const {
  postTodo,
  getTodos,
  getTodo,
  putTodo,
  delTodo,
} = require("../controllers/todoController");

const express = require("express");
const router = express.Router();

router.get("/read", (req, res) => getTodos(req, res));

router.get("/read/:id", (req, res) => getTodo(req, res));

router.post("/create", (req, res) => postTodo(req, res));

router.put("/update/:id", (req, res) => putTodo(req, res));

router.delete("/delete/:id", (req, res) => delTodo(req, res));

module.exports = router;
