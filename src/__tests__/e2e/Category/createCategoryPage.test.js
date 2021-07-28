import "jest-extended";
const { connect, disconnect } = require("../../../helper/db");
const Category = require("../../../models/categoryModel");

describe("Create categry page tests", () => {
  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
  });

  beforeEach(async () => {
    await page.goto("http://localhost:3000/create/category");
  });

  it("Create category form discard button test", async () => {
    await page.waitForSelector(".btn-warning");
    const discardButton = await page.$(".btn-warning");
    await discardButton.evaluate((el) => el.click());
    expect(page.url()).toEndWith("/");
    expect(page.url()).not.toContain("/create/category");
  });

  it("Create category form reset button test", async () => {
    await page.waitForSelector(
      "#root > div > form > div:nth-child(1) > div > input"
    );
    const titleBox = await page.$(
      "#root > div > form > div:nth-child(1) > div > input"
    );
    await titleBox.type("Test Category");
    await page.waitForSelector(".btn-primary");
    const resetButton = await page.$(".btn-primary");
    await resetButton.evaluate((el) => el.click());
    expect(await titleBox.evaluate((el) => el.value)).toEqual("");
  });

  it("Create category form create button", async () => {
    await page.waitForSelector(
      "#root > div > form > div:nth-child(1) > div > input"
    );
    const titleBox = await page.$(
      "#root > div > form > div:nth-child(1) > div > input"
    );
    await titleBox.type("Test Category");
    await page.waitForSelector(".btn-success");

    const createButton = await page.$(".btn-success");
    createButton.evaluate((el) => el.click());

    await page.waitForSelector(".response:not(:empty)");
    const response = await page.$(".response");
    expect(await response.evaluate((el) => el.textContent)).toStartWith(
      "Category was created successfully! ID:"
    );

    const id = (await response.evaluate((el) => el.textContent))
      .split(" ")
      .slice(-1);
    const savedCategory = await Category.findById(id);
    expect(savedCategory.name).toEqual("Test Category");

    await Category.findByIdAndDelete(id);
  });
});
