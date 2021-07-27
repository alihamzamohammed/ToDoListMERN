import "jest-extended";
const { connect, disconnect } = require("../../../helper/db");
const Category = require("../../../models/categoryModel");
const Todo = require("../../../models/todoModel");

describe("Edit category page tests", () => {
  let testCat;

  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await disconnect();
  });

  beforeEach(async () => {
    testCat = new Category({ name: "Test Category" });
    await testCat.save();
    await page.goto(`http://localhost:3000/edit/category/${testCat._id}`);
  });

  afterEach(async () => {
    await Category.findByIdAndDelete(testCat._id);
  });

  it("Edit category page correct details test", async () => {
    await page.waitForSelector(
      "#root > div > form > div:nth-child(2) > div > input"
    );
    const titleBox = await page.$(
      "#root > div > form > div:nth-child(2) > div > input"
    );
    expect(await titleBox.evaluate((el) => el.value)).toEqual("Test Category");
  });
});
