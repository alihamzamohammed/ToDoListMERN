import "jest-extended";
const { connect, disconnect } = require("../../helper/db");
const Category = require("../../models/categoryModel");
const Todo = require("../../models/todoModel");

describe("Home Page tests", () => {
  beforeEach(async () => {
    await page.goto("http://localhost:3000/");
  });

  it("Check if category 0 exists", async () => {
    await page.waitForSelector("#category-0");
    const cat = await page.$("#category-0");
    expect(await cat.$eval(".category-id", (el) => el.textContent)).toEqual(
      "0"
    );
    expect(await cat.$eval(".category-name", (el) => el.textContent)).toEqual(
      "Unsorted Todos"
    );
  });

  it("Check title is on page", async () => {
    await page.waitForSelector(".title");
    expect(await page.$eval(".title", (el) => el.textContent)).toEqual(
      "Your To-Dos:"
    );
  });

  it("Check new category is added to page", async () => {
    connect();

    const testCat = new Category({ name: "Test Category" });
    await testCat.save();

    await page.reload();
    await page.waitForSelector(`#category-${testCat._id}`);

    const cat = await page.$(`#category-${testCat._id}`);
    const id = await cat.$eval(".category-id", (el) => el.textContent);

    const name = await cat.$eval(".category-name", (el) => el.textContent);
    expect(JSON.stringify(id)).toBe(JSON.stringify(testCat._id));
    expect(name).toEqual(testCat.name);

    await Category.findByIdAndDelete(testCat._id);

    disconnect();
  });

  it("Check new todo is added to page", async () => {
    connect();

    const testTodo = new Todo({ title: "Test Title", content: "Test Content" });
    await testTodo.save();

    await page.reload();
    await page.waitForSelector(`#todo-${testTodo._id}`);

    const todo = await page.$(`#todo-${testTodo._id}`);
    const id = await todo.$eval(".card-subtitle", (el) => el.textContent);
    const title = await todo.$eval(".card-title", (el) => el.textContent);
    const content = await todo.$eval(".card-text", (el) => el.textContent);

    expect(JSON.stringify(id)).toBe(JSON.stringify(testTodo._id));
    expect(title).toEqual(testTodo.title);
    expect(content).toEqual(testTodo.content);

    await Todo.findByIdAndDelete(testTodo._id);

    disconnect();
  });

  it("Check new todo is added to category on page", async () => {
    connect();

    const testCat = new Category({ name: "Test Category" });
    await testCat.save();

    const testTodo = new Todo({
      title: "Test Title",
      content: "Test Content",
      category: testCat._id,
    });
    await testTodo.save();

    await page.reload();
    await page.waitForSelector(`#todo-${testTodo._id}`);

    const cat = await page.$(`#category-${testCat._id}`);
    const todo = await page.$(`#todo-${testTodo._id}`);
    const id = await todo.$eval(".card-subtitle", (el) => el.textContent);
    const title = await todo.$eval(".card-title", (el) => el.textContent);
    const content = await todo.$eval(".card-text", (el) => el.textContent);

    expect(cat.$(`#todo-${testTodo._id}`)).resolves.toBeTruthy();
    expect(JSON.stringify(id)).toBe(JSON.stringify(testTodo._id));
    expect(title).toEqual(testTodo.title);
    expect(content).toEqual(testTodo.content);

    await Todo.findByIdAndDelete(testTodo._id);
    await Category.findByIdAndDelete(testCat._id);

    disconnect();
  });
});

describe("Home page navigation tests", () => {
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
    connect();

    const testCat = new Category({ name: "Test Category" });
    await testCat.save();

    await page.reload();
    await page.waitForSelector(`#category-${testCat._id}`);

    const cat = await page.$(`#category-${testCat._id}`);
    await cat.evaluate((el) => el.click());
    expect(page.url()).toEndWith(`/edit/category/${testCat._id}`);

    await Category.findByIdAndDelete(testCat._id);
    disconnect();
  });

  it("Navigate to edit todo page", async () => {
    connect();

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
    disconnect();
  });
});
