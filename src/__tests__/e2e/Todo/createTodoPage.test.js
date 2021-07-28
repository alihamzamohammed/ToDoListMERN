import "jest-extended";
const { connect, disconnect } = require("../../../helper/db");
const Todo = require("../../../models/todoModel");

describe("Create todo page tests", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
  });

  beforeEach(async () => {
    await page.goto("http://localhost:3000/create/todo");
  });

  it("Create todo form discard button test", async () => {
    await page.waitForSelector(".btn-warning");
    const discardButton = await page.$(".btn-warning");
    await discardButton.evaluate((el) => el.click());
    expect(page.url()).toEndWith("/");
    expect(page.url()).not.toContain("/create/todo");
  });

  it("Create todo form reset button test", async () => {
    await page.waitForSelector(
      "#root > div > form > div:nth-child(1) > div:nth-child(1) > input"
    );
    const titleBox = await page.$(
      "#root > div > form > div:nth-child(1) > div:nth-child(1) > input"
    );
    await titleBox.type("Test Title");

    await page.waitForSelector(
      "#root > div > form > div:nth-child(1) > div:nth-child(2) > input"
    );
    const contentBox = await page.$(
      "#root > div > form > div:nth-child(1) > div:nth-child(2) > input"
    );
    await contentBox.type("Test Content");
    await page.waitForSelector(".btn-primary");
    const resetButton = await page.$(".btn-primary");
    await resetButton.evaluate((el) => el.click());
    expect(await titleBox.evaluate((el) => el.value)).toEqual("");
    expect(await contentBox.evaluate((el) => el.value)).toEqual("");
  });

  it("Create todo form create button", async () => {
    await page.waitForSelector(
      "#root > div > form > div:nth-child(1) > div:nth-child(1) > input"
    );
    const titleBox = await page.$(
      "#root > div > form > div:nth-child(1) > div:nth-child(1) > input"
    );
    await titleBox.type("Test Title");

    await page.waitForSelector(
      "#root > div > form > div:nth-child(1) > div:nth-child(2) > input"
    );
    const contentBox = await page.$(
      "#root > div > form > div:nth-child(1) > div:nth-child(2) > input"
    );
    await contentBox.type("Test Content");

    await page.waitForSelector(".btn-success");

    const createButton = await page.$(".btn-success");
    createButton.evaluate((el) => el.click());

    await page.waitForSelector(".response:not(:empty)");
    const response = await page.$(".response");
    expect(await response.evaluate((el) => el.textContent)).toStartWith(
      "Todo was created successfully! ID:"
    );

    const id = (await response.evaluate((el) => el.textContent))
      .split(" ")
      .slice(-1);
    const savedTodo = await Todo.findById(id);
    expect(savedTodo.title).toEqual("Test Title");
    expect(savedTodo.content).toEqual("Test Content");

    await Todo.findByIdAndDelete(id);
  });
});
