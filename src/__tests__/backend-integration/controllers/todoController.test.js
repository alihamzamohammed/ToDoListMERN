const {
  postTodo,
  getTodos,
  getTodo,
  putTodo,
  delTodo,
} = require("../../../controllers/todoController");

const Todo = require("../../../models/todoModel");

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

describe("Todo controller tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Get all todos test", async () => {
    Todo.find = jest.fn().mockImplementation(() => ({
      populate: jest.fn().mockResolvedValue([testCat]),
    }));

    const req = mockRequest();
    const res = mockResponse();

    await getTodos(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining([testCat]));
  });

  it("Get todo by ID test", async () => {
    Todo.findById = jest.fn().mockImplementation(() => ({
      populate: jest.fn().mockResolvedValue(testCat),
    }));
    const req = mockRequest(0);
    const res = mockResponse();

    await getTodo(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining(testCat));
  });

  it("Post todo test", async () => {
    Todo.prototype.save = jest.fn().mockResolvedValue(testCat);
    const req = mockRequest();
    const res = mockResponse();

    await postTodo(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining(testCat));
  });

  it("Put todo test", async () => {
    Todo.findOneAndUpdate = jest.fn().mockImplementation(() => ({
      populate: jest.fn().mockResolvedValue(testCat),
    }));
    const req = mockRequest();
    const res = mockResponse();

    await putTodo(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining(testCat));
  });

  it("Delete todo test", async () => {
    Todo.deleteOne = jest.fn().mockResolvedValue(testCat);
    const req = mockRequest();
    const res = mockResponse();

    await delTodo(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining(testCat));
  });
});
