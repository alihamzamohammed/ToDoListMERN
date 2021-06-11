const { addNewCategory, getAllCategory, getCategoryById, updateCategory, deleteCategory } = require("../controllers/categoryController");

const express = require('express');
const router = express.Router();

router.get('/read', (req, res) => getAllCategory(req, res));

router.get("/read/:id", (req, res) => getCategoryById);

router.post("/create", (req, res) => addNewCategory);

router.put("/update/:id", (req, res) => updateCategory);

router.delete("/delete/:id", (req, res) => deleteCategory);

module.exports = router;
