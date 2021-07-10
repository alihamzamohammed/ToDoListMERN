const {
  postCategory,
  getCategories,
  getCategory,
  putCategory,
  delCategory,
} = require("../../../controllers/categoryController");
let service = require("../../../services/categoryService");

jest.mock("../../../services/categoryService");

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

jest.setTimeout(20000);

describe("Category controller tests", () => {
  it("Get all categories test", async () => {
    service.getAllCategory.mockResolvedValue({
      status: 200,
      response: [testCat],
    });
    const req = mockRequest();
    const res = mockResponse();

    await getCategories(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining([testCat]));
  });

  it("Get category by ID test", async () => {
    service.getCategoryById.mockResolvedValue({
      status: 200,
      response: testCat,
    });
    const req = mockRequest(0);
    const res = mockResponse();

    await getCategory(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining(testCat));
  });

  it("Post category test", async () => {
    service.addNewCategory.mockResolvedValue({
      status: 200,
      response: testCat,
    });
    const req = mockRequest();
    const res = mockResponse();

    await postCategory(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining(testCat));
  });

  it("Put category test", async () => {
    service.updateCategory.mockResolvedValue({
      status: 200,
      response: testCat,
    });
    const req = mockRequest();
    const res = mockResponse();

    await putCategory(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining(testCat));
  });

  it("Delete category test", async () => {
    service.deleteCategory.mockResolvedValue({
      status: 200,
      response: testCat,
    });
    const req = mockRequest();
    const res = mockResponse();

    await delCategory(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining(testCat));
  });
});
