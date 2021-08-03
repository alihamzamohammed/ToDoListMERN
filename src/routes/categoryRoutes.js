/**
 * Defined routes for Category
 */

const {
  postCategory,
  getCategories,
  getCategory,
  putCategory,
  delCategory,
} = require("../controllers/categoryController");

const express = require("express");
const router = express.Router();

/** Read all categories route */
router.get("/read", (req, res) => getCategories(req, res));

/** Read specific category by ID route */
router.get("/read/:id", (req, res) => getCategory(req, res));

/** Create category route */
router.post("/create", (req, res) => postCategory(req, res));

/** Update category route */
router.put("/update/:id", (req, res) => putCategory(req, res));

/** Delete category route */
router.delete("/delete/:id", (req, res) => delCategory(req, res));

module.exports = router;
