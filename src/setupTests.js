const { connect, disconnect } = require("../../src/helper/db");
const Category = require("../../src/models/categoryModel");
const Todo = require("../../src/models/todoModel");

module.exports = beforeAll(async () => {
  console.log("Tests finished");
  await connect();
  Category.deleteMany({});
  Todo.deleteMany({});
  await disconnect();
  console.log("Database cleared");
});
