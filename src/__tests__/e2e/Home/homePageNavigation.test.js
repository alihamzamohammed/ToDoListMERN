import "jest-extended";
const { connect, disconnect } = require("../../../helper/db");
const Category = require("../../../models/categoryModel");
const Todo = require("../../../models/todoModel");

describe("Home page navigation tests", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
  });

  beforeEach(async () => {
    await page.goto("http://localhost:3000/");
  });

  it("Navigate to home page", async () => {
    await page.waitForSelector("#nav-home");
    const navHome = await page.$("#nav-home");
    await navHome.evaluate((el) => el.click());
    expect(page.url()).toEndWith("/");
  });

  it("Navigate to create category page", async () => {
    await page.waitForSelector("#create-dropdown");
    await page.$eval("#create-dropdown", (el) => el.click());
    await page.waitForSelector("#nav-category-create");
    const navCategoryCreate = await page.$("#nav-category-create");
    await navCategoryCreate.evaluate((el) => el.click());
    expect(page.url()).toEndWith("/create/category");
  });

  it("Navigate to create todo page", async () => {
    await page.waitForSelector("#create-dropdown");
    await page.$eval("#create-dropdown", (el) => el.click());
    await page.waitForSelector("#nav-todo-create");
    const navTodoCreate = await page.$("#nav-todo-create");
    await navTodoCreate.evaluate((el) => el.click());
    expect(page.url()).toEndWith("/create/todo");
  });

  it("Navigate to edit category page", async () => {
    const testCat = new Category({ name: "Test Category" });
    await testCat.save();

    await page.reload();
    await page.waitForSelector(`#category-${testCat._id}`);

    const cat = await page.$(`#category-${testCat._id}`);
    await cat.evaluate((el) => el.click());
    expect(page.url()).toEndWith(`/edit/category/${testCat._id}`);

    await Category.findByIdAndDelete(testCat._id);
  });

  it("Navigate to edit todo page", async () => {
    const testTodo = new Todo({
      title: "Test Title",
      content: "Test Content",
    });
    await testTodo.save();

    await page.reload();
    await page.waitForSelector(`#todo-${testTodo._id}`);

    const todo = await page.$(`#todo-${testTodo._id}`);
    await todo.evaluate((el) => el.click());
    expect(page.url()).toEndWith(`/edit/todo/${testTodo._id}`);

    await Todo.findByIdAndDelete(testTodo._id);
  });
});
