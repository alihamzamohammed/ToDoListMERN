const {
  addNewCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  Category,
} = require("../../../services/categoryService");

var testCat = new Category({ name: "testing" });

describe("Get all categories", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Correct entry", async () => {
    const expectedResponse = { status: 200, response: [testCat] };
    const spy = jest.spyOn(Category, "find").mockResolvedValue([testCat]);
    await expect(getAllCategory()).resolves.toEqual(expectedResponse);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("Error response", async () => {
    let err = new Error("Test Error");
    const expectedResponse = { status: 500, response: err };
    const spy = jest.spyOn(Category, "find").mockImplementation(() => {
      throw err;
    });
    await expect(getAllCategory()).resolves.toEqual(expectedResponse);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe("Get category by ID", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Correct entry", async () => {
    const expectedResponse = { status: 200, response: testCat };
    const req = { params: { id: "0" } };
    const spy = jest.spyOn(Category, "findById").mockResolvedValue(testCat);
    await expect(getCategoryById(req)).resolves.toEqual(expectedResponse);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("Error response", async () => {
    let err = new Error("Test Error");
    const expectedResponse = { status: 404, response: err };
    const req = { params: { id: "0" } };
    const spy = jest.spyOn(Category, "findById").mockImplementation(() => {
      throw err;
    });
    await expect(getCategoryById(req)).resolves.toEqual(expectedResponse);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
