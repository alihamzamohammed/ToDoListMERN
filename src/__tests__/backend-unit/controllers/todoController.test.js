const {
  postTodo,
  getTodos,
  getTodo,
  putTodo,
  delTodo,
} = require("../../../controllers/todoController");
let service = require("../../../services/todoService");

jest.mock("../../../services/todoService");

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

describe("Todo controller tests", () => {
  it("Get all todos test", async () => {
    service.getAllTodo.mockResolvedValue({
      status: 200,
      response: [testCat],
    });
    const req = mockRequest();
    const res = mockResponse();

    await getTodos(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining([testCat]));
  });

  it("Get todo by ID test", async () => {
    service.getTodoById.mockResolvedValue({
      status: 200,
      response: testCat,
    });
    const req = mockRequest(0);
    const res = mockResponse();

    await getTodo(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining(testCat));
  });

  it("Post todo test", async () => {
    service.addNewTodo.mockResolvedValue({
      status: 200,
      response: testCat,
    });
    const req = mockRequest();
    const res = mockResponse();

    await postTodo(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining(testCat));
  });

  it("Put todo test", async () => {
    service.updateTodo.mockResolvedValue({
      status: 200,
      response: testCat,
    });
    const req = mockRequest();
    const res = mockResponse();

    await putTodo(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining(testCat));
  });

  it("Delete todo test", async () => {
    service.deleteTodo.mockResolvedValue({
      status: 200,
      response: testCat,
    });
    const req = mockRequest();
    const res = mockResponse();

    await delTodo(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining(testCat));
  });
});
