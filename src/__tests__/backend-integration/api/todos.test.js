import "jest-extended";
const mongoose = require("mongoose");
const request = require("supertest");
const { connect, disconnect } = require("../../../helper/db");
const Todo = require("../../../models/todoModel");

const app = require("../../../app");

describe("Backend API Todo tests", () => {
  let testTodo;

  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await Todo.deleteMany({});
    await disconnect();
  });

  beforeEach(async () => {
    testTodo = new Todo({ title: "Test Todo", content: "Test Todo Content" });
    return testTodo.save();
  });

  afterEach(async () => {
    return Todo.findByIdAndDelete(testTodo._id);
  });

  it("GET all todos test", () => {
    return request(app)
      .get("/todo/read")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject(
          JSON.parse(JSON.stringify([testTodo.toObject()]))
        );
      });
  });

  it("GET one todo test", () => {
    return request(app)
      .get(`/todo/read/${testTodo._id}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject(
          JSON.parse(JSON.stringify(testTodo.toObject()))
        );
      });
  });

  it("POST todo test", (done) => {
    let newTodo = { title: "New Todo", content: "New Todo Content" };
    return request(app)
      .post("/todo/create")
      .send(newTodo)
      .then(async (response) => {
        let saved = await Todo.find(newTodo).exec();
        expect(response.statusCode).toBe(200);
        expect([response.body]).toMatchObject(
          JSON.parse(JSON.stringify(saved))
        );
        await Todo.findByIdAndDelete(saved._id);
        done();
      });
  });

  it("PUT todo test", () => {
    let updatedTodo = { title: "Updated Todo" };
    return request(app)
      .put(`/todo/update/${testTodo._id}`)
      .send(updatedTodo)
      .then(async (response) => {
        let updated = await Todo.find(updatedTodo).exec();
        expect(response.statusCode).toBe(200);
        expect([response.body]).toMatchObject(
          JSON.parse(JSON.stringify(updated))
        );
      });
  });

  it("DELETE todo test", () => {
    return request(app)
      .del(`/todo/delete/${testTodo._id}`)
      .then(async (response) => {
        expect(response.statusCode).toBe(200);
        expect(await Todo.exists({ _id: testTodo._id })).toBeFalse();
      });
  });
});
