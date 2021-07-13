const Category = require("../models/categoryModel");

const addNewCategory = async (req) => {
  try {
    let newCategory = new Category(req.body);
    let res = await newCategory.save();
    return { status: 200, response: res };
  } catch (err) {
    return { status: 500, response: err };
  }
};

const getAllCategory = async () => {
  try {
    let categories = await Category.find({});
    return { status: 200, response: categories };
  } catch (err) {
    return { status: 500, response: err };
  }
};

const getCategoryById = async (req) => {
  try {
    let category = await Category.findById(req.params.id);
    return { status: 200, response: category };
  } catch (err) {
    return { status: 404, response: err };
  }
};

const updateCategory = async (req) => {
  try {
    let category = await Category.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, useFindAndModify: false }
    );
    return { status: 200, response: category };
  } catch (err) {
    return { status: 500, response: err };
  }
};

const deleteCategory = async (req) => {
  try {
    let deleted = await Category.deleteOne({ _id: req.params.id });
    return { status: 200, response: deleted };
  } catch (err) {
    return { status: 500, response: err };
  }
};

module.exports = {
  addNewCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
