const {
  postCategory,
  getCategories,
  getCategory,
  putCategory,
  delCategory,
} = require("../../../controllers/categoryController");

const Category = require("../../../models/categoryModel");

let testCat = { title: "hello" };

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = (id) => {
  return {
    params: { id: id },
  };
};

describe("Category controller tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Get all categories test", async () => {
    Category.find = jest.fn().mockResolvedValue([testCat]);

    const req = mockRequest();
    const res = mockResponse();

    await getCategories(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining([testCat]));
  });

  it("Get category by ID test", async () => {
    Category.findById = jest.fn().mockResolvedValue(testCat);
    const req = mockRequest(0);
    const res = mockResponse();

    await getCategory(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining(testCat));
  });

  it("Post category test", async () => {
    Category.prototype.save = jest.fn().mockResolvedValue(testCat);
    const req = mockRequest();
    const res = mockResponse();

    await postCategory(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining(testCat));
  });

  it("Put category test", async () => {
    Category.findOneAndUpdate = jest.fn().mockResolvedValue(testCat);
    const req = mockRequest();
    const res = mockResponse();

    await putCategory(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining(testCat));
  });

  it("Delete category test", async () => {
    Category.deleteOne = jest.fn().mockResolvedValue(testCat);
    const req = mockRequest();
    const res = mockResponse();

    await delCategory(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining(testCat));
  });
});
