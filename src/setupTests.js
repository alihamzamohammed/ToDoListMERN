const { connect, disconnect } = require("../../src/helper/db");
const Category = require("../../src/models/categoryModel");
const Todo = require("../../src/models/todoModel");

/**
 * Exports Jest beforeAll function to clear database
 */
module.exports = beforeAll(async () => {
  await connect();
  Category.deleteMany({});
  Todo.deleteMany({});
  await disconnect();
  console.log("Database cleared");
});
