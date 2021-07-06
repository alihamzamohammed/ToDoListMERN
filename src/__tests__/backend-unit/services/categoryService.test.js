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

  it("Correct input", async () => {
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

  it("Correct input", async () => {
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

describe("Create category", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Correct input", async () => {
    const expectedResponse = { status: 200, response: testCat };
    const req = { body: { name: "testing" } };
    const spy = jest
      .spyOn(Category.prototype, "save")
      .mockResolvedValue(testCat);
    await expect(addNewCategory(req)).resolves.toEqual(expectedResponse);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("Error response", async () => {
    let err = new Error("Test Error");
    const expectedResponse = { status: 500, response: err };
    const req = { body: { name: "testing" } };
    const spy = jest
      .spyOn(Category.prototype, "save")
      .mockImplementation(() => {
        throw err;
      });
    await expect(addNewCategory(req)).resolves.toEqual(expectedResponse);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe("Update category", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Correct input", async () => {
    const expectedResponse = { status: 200, response: testCat };
    const req = { params: { id: "0" }, body: { name: "testing" } };
    const spy = jest
      .spyOn(Category, "findOneAndUpdate")
      .mockResolvedValue(testCat);
    await expect(updateCategory(req)).resolves.toEqual(expectedResponse);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("Error response", async () => {
    let err = new Error("Test Error");
    const expectedResponse = { status: 500, response: err };
    const req = { params: { id: "0" }, body: { name: "testing" } };
    const spy = jest
      .spyOn(Category, "findOneAndUpdate")
      .mockImplementation(() => {
        throw err;
      });
    await expect(updateCategory(req)).resolves.toEqual(expectedResponse);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe("Delete category", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Correct input", async () => {
    const expectedResponse = { status: 200, response: true };
    const req = { params: { id: "0" } };
    const spy = jest.spyOn(Category, "deleteOne").mockResolvedValue(true);
    await expect(deleteCategory(req)).resolves.toEqual(expectedResponse);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("Error response", async () => {
    let err = new Error("Test Error");
    const expectedResponse = { status: 500, response: err };
    const req = { params: { id: "0" } };
    const spy = jest.spyOn(Category, "deleteOne").mockImplementation(() => {
      throw err;
    });
    await expect(deleteCategory(req)).resolves.toEqual(expectedResponse);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
