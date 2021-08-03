/**
 * Service functions for category
 */

const Category = require("../models/categoryModel");

/**
 * Saves new category to database
 * @param {express.Request} req Indicates contents of new category
 * @returns {Object} Object with correct status and database response
 */
const addNewCategory = async (req) => {
  try {
    let newCategory = new Category(req.body);
    let res = await newCategory.save();
    return { status: 200, response: res };
  } catch (err) {
    return { status: 500, response: err };
  }
};

/**
 * Gets all categories from database
 * @returns {Object} Object with correct status and database response
 */
const getAllCategory = async () => {
  try {
    let categories = await Category.find({});
    return { status: 200, response: categories };
  } catch (err) {
    return { status: 500, response: err };
  }
};

/**
 * Gets specific ctegory by ID
 * @param {express.Request} req Indicates ID of category
 * @returns {Object} Object with correct status and database response
 */
const getCategoryById = async (req) => {
  try {
    let category = await Category.findById(req.params.id);
    return { status: 200, response: category };
  } catch (err) {
    return { status: 404, response: err };
  }
};

/**
 * Updates category by ID with specified contents
 * @param {express.Request} req Indicates ID and new contents of category
 * @returns {Object} Object with correct status and database response
 */
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

/**
 * Deletes category by ID
 * @param {express.Request} req Indicates ID of category
 * @returns {Object} Object with correct status and database response
 */
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
