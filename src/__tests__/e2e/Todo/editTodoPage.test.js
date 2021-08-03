import "jest-extended";
const { connect, disconnect } = require("../../../helper/db");
const Todo = require("../../../models/todoModel");

describe("Edit todo page tests", () => {
  let testTodo;

  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
  });

  beforeEach(async () => {
    testTodo = new Todo({ title: "Test Title", content: "Test Content" });
    return testTodo.save();
  });

  it("Edit todo page reset button test", async () => {
    await page.goto(`http://localhost:3000/edit/todo/${testTodo._id}`);
    await page.waitForSelector(
      "#root > div > form > div:nth-child(2) > div:nth-child(1) > input"
    );
    const titleBox = await page.$(
      "#root > div > form > div:nth-child(2) > div:nth-child(1) > input"
    );
    await page.waitForSelector(
      "#root > div > form > div:nth-child(2) > div:nth-child(2) > input"
    );
    const contentBox = await page.$(
      "#root > div > form > div:nth-child(2) > div:nth-child(2) > input"
    );
    await page.waitForSelector(".btn-primary");
    const resetButton = await page.$(".btn-primary");
    await resetButton.evaluate((el) => el.click());
    expect(await titleBox.evaluate((el) => el.value)).toEqual("");
    expect(await contentBox.evaluate((el) => el.value)).toEqual("");
    await Todo.findByIdAndDelete(testTodo._id);
  });

  it("Edit todo page discard button test", async () => {
    await page.goto(`http://localhost:3000/edit/todo/${testTodo._id}`);
    await page.waitForSelector(".btn-warning");
    const discardButton = await page.$(".btn-warning");
    await discardButton.evaluate((el) => el.click());
    expect(page.url()).toEndWith("/");
    expect(page.url()).not.toContain("/edit/todo");
    expect(page.url()).not.toContain(`/edit/todo/${testTodo._id}`);
    await Todo.findByIdAndDelete(testTodo._id);
  });

  it("Edit todo page correct details test", async () => {
    await page.goto(`http://localhost:3000/edit/todo/${testTodo._id}`);

    await page.waitForSelector(
      "#root > div > form > div:nth-child(2) > div:nth-child(1) > input"
    );
    const titleBox = await page.$(
      "#root > div > form > div:nth-child(2) > div:nth-child(1) > input"
    );
    await page.waitForSelector(
      "#root > div > form > div:nth-child(2) > div:nth-child(2) > input"
    );
    const contentBox = await page.$(
      "#root > div > form > div:nth-child(2) > div:nth-child(2) > input"
    );
    const id = await page.$(
      "#root > div > form > div:nth-child(1) > p:nth-child(1)"
    );
    const dateAdded = await page.$(
      "#root > div > form > div:nth-child(1) > p:nth-child(2)"
    );
    const chosenCat = await page.$(
      "#root > div > form > div:nth-child(2) > div:nth-child(3) > select"
    );
    expect(await titleBox.evaluate((el) => el.value)).toEqual(testTodo.title);
    expect(await contentBox.evaluate((el) => el.value)).toEqual(
      testTodo.content
    );
    expect(await chosenCat.evaluate((el) => el.value)).toEqual("0");
    expect(await id.evaluate((el) => el.textContent)).toInclude(testTodo._id);
    expect(await dateAdded.evaluate((el) => el.textContent)).toContain(
      new Date(testTodo.dateAdded).toUTCString()
    );
    await Todo.findByIdAndDelete(testTodo._id);
  });

  it("Edit todo page update button test", async () => {
    await page.goto(`http://localhost:3000/edit/todo/${testTodo._id}`);

    await page.waitForSelector(
      "#root > div > form > div:nth-child(2) > div:nth-child(1) > input"
    );
    const titleBox = await page.$(
      "#root > div > form > div:nth-child(2) > div:nth-child(1) > input"
    );
    await titleBox.type(" updated");
    await page.waitForSelector(
      "#root > div > form > div:nth-child(2) > div:nth-child(2) > input"
    );
    const contentBox = await page.$(
      "#root > div > form > div:nth-child(2) > div:nth-child(2) > input"
    );
    await contentBox.type(" updated");
    await page.waitForSelector(".btn-success");
    const updateButton = await page.$(".btn-success");
    await updateButton.evaluate((el) => el.click());

    await page.waitForSelector(".response:not(:empty)");
    const response = await page.$(".response");

    expect(await response.evaluate((el) => el.textContent)).toEqual(
      "Todo was updated successfully!"
    );
    const todo = await Todo.findById(testTodo._id);
    expect(todo.title).toEqual("Test Title updated");
    expect(todo.content).toEqual("Test Content updated");
    await Todo.findByIdAndDelete(testTodo._id);
  });

  it("Edit todo page delete button test", async () => {
    await page.goto(`http://localhost:3000/edit/todo/${testTodo._id}`);

    await page.waitForSelector(".btn-danger");
    const deleteButton = await page.$(".btn-danger");
    await deleteButton.evaluate((el) => el.click());

    await page.waitForSelector(".response:not(:empty)");
    const response = await page.$(".response");

    expect(await response.evaluate((el) => el.textContent)).toEqual(
      "Todo was deleted successfully!"
    );
    expect(await Todo.exists({ _id: testTodo._id })).toBeFalse();
    expect((await page.$$("button[disabled]")).length).toBe(4);
    expect((await page.$$("input[disabled]")).length).toBe(2);
    expect((await page.$$("select[disabled]")).length).toBe(1);
    await Todo.findByIdAndDelete(testTodo._id);
  });
});
