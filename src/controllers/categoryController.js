/**
 * Express controller for categories
 */
const {
  addNewCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");

/**
 * POST request handler for category
 * Returns status and response from addNewCategory service function
 * @param {express.Request} req Incoming request
 * @param {express.Response} res Outgoing response
 */
const postCategory = async (req, res) => {
  let { status, response } = await addNewCategory(req);
  res.status(status).json(response);
};

/**
 * GET request handler for all categories
 * Returns status and response from getAllCategory service function
 * @param {express.Request} req Incoming request
 * @param {express.Response} res Outgoing response
 */
const getCategories = async (req, res) => {
  let { status, response } = await getAllCategory();
  res.status(status).json(response);
};

/**
 * GET request handler for specific category
 * Returns status and response from getCategoryById service function
 * @param {express.Request} req Incoming request
 * @param {express.Response} res Outgoing response
 */
const getCategory = async (req, res) => {
  let { status, response } = await getCategoryById(req);
  res.status(status).json(response);
};

/**
 * PUT request handler for category
 * Returns status and response from updateCategory service function
 * @param {express.Request} req Incoming request
 * @param {express.Response} res Outgoing response
 */
const putCategory = async (req, res) => {
  let { status, response } = await updateCategory(req);
  res.status(status).json(response);
};

/**
 * DELETE request handler for category
 * Returns status and response from deleteCategory service function
 * @param {express.Request} req Incoming request
 * @param {express.Response} res Outgoing response
 */
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
