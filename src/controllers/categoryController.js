const {
  addNewCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");

const postCategory = async (req, res) => {
  let { status, response } = await addNewCategory(req);
  res.status(status).json(response);
};

const getCategories = async (req, res) => {
  let { status, response } = await getAllCategory();
  res.status(status).json(response);
};

const getCategory = async (req, res) => {
  let { status, response } = await getCategoryById(req);
  res.status(status).json(response);
};

const putCategory = async (req, res) => {
  let { status, response } = await updateCategory(req);
  res.status(status).json(response);
};

const delCategory = async (req, res) => {
  let { status, response } = await deleteCategory(req);
  res.status(status).json(response);
};

module.exports = {
  postCategory,
  getCategories,
  getCategory,
  putCategory,
  delCategory,
};
