const mongoose = require("mongoose");
const categorySchema = require("../models/categoryModel");

var Category = mongoose.model("Category", categorySchema);

const addNewCategory = (req, res) => {
    let newCategory = new Category(req.body);
    newCategory.save((err, categoryRes) => {
        if (err) {
            res.send(err);
        }
        res.json(categoryRes);
    });
};

const getAllCategory = (req, res) => {
    Category.find({}, (err, categorys) => {
        if (err) {
            res.send(err);  
        }
        res.json(categorys);
    });
};

const getCategoryById = (req, res) => {
    Category.findById(req.params.id, (err, categoryFound) => {
        if (err) {
            res.send(err);
        }
        res.json(categoryFound);
    });
};

const updateCategory = (req, res) => {
    Category.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, useFindAndModify: false }, (err, categoryUpdated) => {
        if (err) {
            res.send(err);
        }
        res.json(categoryUpdated);
    });
};

const deleteCategory = (req, res) => {
    Category.deleteOne({ _id: req.params.id }, (err, deleted) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: "Successfully deleted category", object: deleted });
    });
};

module.exports = { addNewCategory, getAllCategory, getCategoryById, updateCategory, deleteCategory }