const mongoose = require("mongoose");
const categorySchema = require("../models/categoryModel");

var Category = mongoose.model("Category", categorySchema);

const addNewCategory = (req, res) => {
  let newCategory = new Category(req.body);
  newCategory.save((err, categoryRes) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(categoryRes);
  });
};

const getAllCategory = (req, res) => {
  Category.find({})
    .exec()
    .then((categories, err) => {
      if (err) {
        res.status(404).send(err);
      }
      res.status(200).json(categories);
    })
    .catch((err) => res.status(404).send(err));
};

const getCategoryById = (req, res) => {
  Category.findById(req.params.id)
    .exec()
    .then((found, err) => {
      if (err) {
        res.status(404).send(err);
      }
      res.status(200).json(found);
    })
    .catch((err) => res.status(404).send(err));
};

const updateCategory = (req, res) => {
  Category.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, useFindAndModify: false },
    (err, categoryUpdated) => {
      if (err) {
        res.status(200).send(err);
      }
      res.status(200).json(categoryUpdated);
    }
  );
};

const deleteCategory = (req, res) => {
  Category.deleteOne({ _id: req.params.id }, (err, deleted) => {
    if (err) {
      res.status(404).send(err);
    }
    res
      .status(200)
      .json({ message: "Successfully deleted category", object: deleted });
  });
};

module.exports = {
  addNewCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
