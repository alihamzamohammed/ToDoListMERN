const {
  addNewCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../../../services/categoryService");

const db = require("../../../helper/db");
const Category = require("../../../models/categoryModel");
const { CastError } = require("mongoose");
var testCat = new Category({ name: "testing" });

describe("Category service integration test", () => {
  beforeAll(() => {
    db.connect();
  });

  beforeEach(async () => {
    testCat = await testCat.save();
  });

  afterEach(async () => {
    Category.deleteMany({});
  });

  afterAll(() => {
    db.disconnect();
  });

  it("Get all categories correct input", async () => {
    const expectedResponse = { status: 200, response: [testCat] };
    const response = await getAllCategory();
    expect(response.status).toEqual(expectedResponse.status);
    expect(response.response._doc).toEqual(expectedResponse.response._doc);
  });

  it("Get category by ID correct input", async () => {
    const expectedResponse = { status: 200, response: testCat };
    const req = { params: { id: testCat._id } };
    const response = await getCategoryById(req);
    expect(response.status).toBe(expectedResponse.status);
    expect(response.response._doc).toEqual(expectedResponse.response._doc);
  });

  it("Get category by ID wrong input", async () => {
    const expectedResponse = {
      status: 404,
    };
    const req = { params: { id: "0" } };
    const response = await getCategoryById(req);
    expect(response.status).toBe(expectedResponse.status);
    expect(response.response).toBeInstanceOf(CastError);
  });

  it("Add new category correct input", async () => {
    const req = { body: { name: "new category" } };
    const response = await addNewCategory(req);
    const expectedResponse = {
      status: 200,
      response: { name: "new category" },
    };
    expect(response.status).toEqual(expectedResponse.status);
    expect(response.response._doc.name).toEqual(expectedResponse.response.name);
    await Category.findOneAndDelete({ name: "new category" });
  });

  it("Update category correct input", async () => {
    const expectedResponse = {
      status: 200,
      response: { name: "updated category" },
    };
    const req = {
      params: { id: testCat._id },
      body: { name: "updated category" },
    };
    const response = await updateCategory(req);
    expect(response.status).toEqual(expectedResponse.status);
    expect(response.response._doc.name).toEqual(expectedResponse.response.name);
  });

  it("Update category wrong input", async () => {
    const expectedResponse = {
      status: 500,
    };
    const req = {
      params: { id: "0" },
      body: { name: "updated category" },
    };
    const response = await updateCategory(req);
    expect(response.status).toEqual(expectedResponse.status);
    expect(response.response).toBeInstanceOf(CastError);
  });

  it("Delete category correct input", async () => {
    const expectedResponse = {
      status: 200,
      response: {
        n: 1,
        ok: 1,
        deletedCount: 1,
      },
    };
    const req = { params: { id: testCat._id } };
    const response = await deleteCategory(req);
    expect(response.status).toEqual(expectedResponse.status);
    expect(response.response).toEqual(expectedResponse.response);
  });
});
