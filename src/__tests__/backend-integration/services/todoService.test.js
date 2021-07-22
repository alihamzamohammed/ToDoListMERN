const {
  addNewTodo,
  getAllTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
} = require("../../../services/todoService");

const db = require("../../../helper/db");
const Todo = require("../../../models/todoModel");

var testTodo = new Todo({ title: "testing", content: "testing" });

describe("Todo service integration test", () => {
  beforeAll(() => {
    db.connect();
  });

  beforeEach(async () => {
    testTodo = await testTodo.save();
  });

  afterEach(async () => {
    Todo.deleteMany({});
  });

  afterAll(() => {
    db.disconnect();
  });

  it("Get all todos correct input", async () => {
    const expectedResponse = { status: 200, response: [testTodo] };
    const response = await getAllTodo();
    expect(response.status).toEqual(expectedResponse.status);
    expect(response.response._doc).toEqual(expectedResponse.response._doc);
  });

  it("Get todo by ID correct input", async () => {
    const expectedResponse = { status: 200, response: testTodo };
    const req = { params: { id: testTodo._id } };
    const response = await getTodoById(req);
    expect(response.status).toBe(expectedResponse.status);
    expect(response.response._doc).toEqual(expectedResponse.response._doc);
  });

  it("Add new todo correct input", async () => {
    const req = { body: { title: "new todo", content: "new todo" } };
    const response = await addNewTodo(req);
    const expectedResponse = {
      status: 200,
      response: { title: "new todo", content: "new todo" },
    };
    expect(response.status).toEqual(expectedResponse.status);
    expect(response.response._doc.title).toEqual(
      expectedResponse.response.title
    );
    expect(response.response._doc.content).toEqual(
      expectedResponse.response.content
    );
    await Todo.findOneAndDelete({ title: "new todo" });
  });

  it("Update todo correct input", async () => {
    const expectedResponse = {
      status: 200,
      response: { title: "updated todo" },
    };
    const req = {
      params: { id: testTodo._id },
      body: { title: "updated todo" },
    };
    const response = await updateTodo(req);
    expect(response.status).toEqual(expectedResponse.status);
    expect(response.response._doc.name).toEqual(expectedResponse.response.name);
  });

  it("Delete todo correct input", async () => {
    const expectedResponse = {
      status: 200,
      response: {
        n: 1,
        ok: 1,
        deletedCount: 1,
      },
    };
    const req = { params: { id: testTodo._id } };
    const response = await deleteTodo(req);
    expect(response.status).toEqual(expectedResponse.status);
    expect(response.response).toEqual(expectedResponse.response);
  });
});
