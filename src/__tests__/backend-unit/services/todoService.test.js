const {
  addNewTodo,
  getAllTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
  Todo,
} = require("../../../services/todoService");

var testTodo = new Todo({ name: "testing" });

describe("Get all todos", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Correct input", async () => {
    const expectedResponse = { status: 200, response: [testTodo] };
    const spy = jest.spyOn(Todo, "find").mockImplementation(() => ({
      populate: jest.spyOn(Todo, "populate").mockResolvedValue([testTodo]),
    }));
    await expect(getAllTodo()).resolves.toEqual(expectedResponse);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("Error response", async () => {
    let err = new Error("Test Error");
    const expectedResponse = { status: 500, response: err };
    const spy = jest.spyOn(Todo, "find").mockImplementation(() => {
      throw err;
    });
    await expect(getAllTodo()).resolves.toEqual(expectedResponse);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe("Get todo by ID", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Correct input", async () => {
    const expectedResponse = { status: 200, response: testTodo };
    const req = { params: { id: "0" } };
    const spy = jest.spyOn(Todo, "findById").mockImplementation(() => ({
      populate: jest.spyOn(Todo, "populate").mockResolvedValue(testTodo),
    }));
    await expect(getTodoById(req)).resolves.toEqual(expectedResponse);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("Error response", async () => {
    let err = new Error("Test Error");
    const expectedResponse = { status: 404, response: err };
    const req = { params: { id: "0" } };
    const spy = jest.spyOn(Todo, "findById").mockImplementation(() => {
      throw err;
    });
    await expect(getTodoById(req)).resolves.toEqual(expectedResponse);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe("Create todo", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Correct input", async () => {
    const expectedResponse = { status: 200, response: testTodo };
    const req = { body: { name: "testing" } };
    const spy = jest.spyOn(Todo.prototype, "save").mockResolvedValue(testTodo);
    await expect(addNewTodo(req)).resolves.toEqual(expectedResponse);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("Error response", async () => {
    let err = new Error("Test Error");
    const expectedResponse = { status: 500, response: err };
    const req = { body: { name: "testing" } };
    const spy = jest.spyOn(Todo.prototype, "save").mockImplementation(() => {
      throw err;
    });
    await expect(addNewTodo(req)).resolves.toEqual(expectedResponse);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe("Update todo", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Correct input", async () => {
    const expectedResponse = { status: 200, response: testTodo };
    const req = { params: { id: "0" }, body: { name: "testing" } };
    const spy = jest.spyOn(Todo, "findOneAndUpdate").mockImplementation(() => ({
      populate: jest.spyOn(Todo, "populate").mockResolvedValue(testTodo),
    }));
    await expect(updateTodo(req)).resolves.toEqual(expectedResponse);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("Error response", async () => {
    let err = new Error("Test Error");
    const expectedResponse = { status: 500, response: err };
    const req = { params: { id: "0" }, body: { name: "testing" } };
    const spy = jest.spyOn(Todo, "findOneAndUpdate").mockImplementation(() => {
      throw err;
    });
    await expect(updateTodo(req)).resolves.toEqual(expectedResponse);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe("Delete todo", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Correct input", async () => {
    const expectedResponse = { status: 200, response: true };
    const req = { params: { id: "0" } };
    const spy = jest.spyOn(Todo, "deleteOne").mockResolvedValue(true);
    await expect(deleteTodo(req)).resolves.toEqual(expectedResponse);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("Error response", async () => {
    let err = new Error("Test Error");
    const expectedResponse = { status: 500, response: err };
    const req = { params: { id: "0" } };
    const spy = jest.spyOn(Todo, "deleteOne").mockImplementation(() => {
      throw err;
    });
    await expect(deleteTodo(req)).resolves.toEqual(expectedResponse);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
