const {
  postCategory,
  getCategories,
  getCategory,
  putCategory,
  delCategory,
} = require("../controllers/categoryController");

const express = require("express");
const router = express.Router();

router.get("/read", (req, res) => getCategories(req, res));

router.get("/read/:id", (req, res) => getCategory(req, res));

router.post("/create", (req, res) => postCategory(req, res));

router.put("/update/:id", (req, res) => putCategory(req, res));

router.delete("/delete/:id", (req, res) => delCategory(req, res));

module.exports = router;
