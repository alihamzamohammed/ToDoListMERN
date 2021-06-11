const { addNewCategory, getAllCategory, getCategoryById, updateCategory, deleteCategory } = require("../controllers/categoryController");

const express = require('express');
const router = express.Router();

router.get('/read', (req, res) => getAllCategory(req, res));

router.get("/read/:id", (req, res) => getCategoryById(req, res));

router.post("/create", (req, res) => addNewCategory(req, res));

router.put("/update/:id", (req, res) => updateCategory(req, res));

router.delete("/delete/:id", (req, res) => deleteCategory(req, res));

module.exports = router;
