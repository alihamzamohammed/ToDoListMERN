import "jest-extended";
const { connect, disconnect } = require("../../../helper/db");
const Category = require("../../../models/categoryModel");

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
    return testCat.save();
  });

  it("Edit category page reset button test", async () => {
    await page.goto(`http://localhost:3000/edit/category/${testCat._id}`);
    await page.waitForSelector(
      "#root > div > form > div:nth-child(2) > div > input"
    );
    const titleBox = await page.$(
      "#root > div > form > div:nth-child(2) > div > input"
    );
    await page.waitForSelector(".btn-primary");
    const resetButton = await page.$(".btn-primary");
    await resetButton.evaluate((el) => el.click());
    expect(await titleBox.evaluate((el) => el.value)).toEqual("");
    await Category.findByIdAndDelete(testCat._id);
  });

  it("Edit category page discard button test", async () => {
    await page.goto(`http://localhost:3000/edit/category/${testCat._id}`);
    await page.waitForSelector(".btn-warning");
    const discardButton = await page.$(".btn-warning");
    await discardButton.evaluate((el) => el.click());
    expect(page.url()).toEndWith("/");
    expect(page.url()).not.toContain("/edit/category");
    expect(page.url()).not.toContain(`/edit/category/${testCat._id}`);
    await Category.findByIdAndDelete(testCat._id);
  });

  it("Edit category page correct details test", async () => {
    await page.goto(`http://localhost:3000/edit/category/${testCat._id}`);

    await page.waitForSelector(
      "#root > div > form > div:nth-child(2) > div > input"
    );
    const titleBox = await page.$(
      "#root > div > form > div:nth-child(2) > div > input"
    );
    const id = await page.$(
      "#root > div > form > div:nth-child(1) > p:nth-child(1)"
    );
    const dateAdded = await page.$(
      "#root > div > form > div:nth-child(1) > p:nth-child(2)"
    );
    expect(await titleBox.evaluate((el) => el.value)).toEqual(testCat.name);
    expect(await id.evaluate((el) => el.textContent)).toInclude(testCat._id);
    expect(await dateAdded.evaluate((el) => el.textContent)).toContain(
      new Date(testCat.dateAdded).toUTCString()
    );
    await Category.findByIdAndDelete(testCat._id);
  });

  it("Edit category page update button test", async () => {
    await page.goto(`http://localhost:3000/edit/category/${testCat._id}`);

    await page.waitForSelector(
      "#root > div > form > div:nth-child(2) > div > input"
    );
    const titleBox = await page.$(
      "#root > div > form > div:nth-child(2) > div > input"
    );
    await titleBox.type(" updated");

    await page.waitForSelector(".btn-success");
    const updateButton = await page.$(".btn-success");
    await updateButton.evaluate((el) => el.click());

    await page.waitForSelector(".response:not(:empty)");
    const response = await page.$(".response");

    expect(await response.evaluate((el) => el.textContent)).toEqual(
      "Category was updated successfully!"
    );
    const cat = await Category.findById(testCat._id);
    expect(cat.name).toEqual("Test Category updated");
    await Category.findByIdAndDelete(testCat._id);
  });

  it("Edit category page delete button test", async () => {
    await page.goto(`http://localhost:3000/edit/category/${testCat._id}`);

    await page.waitForSelector(".btn-danger");
    const deleteButton = await page.$(".btn-danger");
    await deleteButton.evaluate((el) => el.click());

    await page.waitForSelector(".response:not(:empty)");
    const response = await page.$(".response");

    expect(await response.evaluate((el) => el.textContent)).toEqual(
      "Category was deleted successfully!"
    );
    expect(await Category.exists({ _id: testCat._id })).toBeFalse();
    expect((await page.$$("button[disabled]")).length).toBe(4);
    expect((await page.$$("input[disabled]")).length).toBe(1);
    await Category.findByIdAndDelete(testCat._id);
  });
});
