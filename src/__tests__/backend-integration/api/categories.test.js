import "jest-extended";
const mongoose = require("mongoose");
const request = require("supertest");
const { connect, disconnect } = require("../../../helper/db");
const Category = require("../../../models/categoryModel");

const app = require("../../../app");

describe("Backend API Category tests", () => {
  let testCat;

  beforeAll(async () => {
    await connect();
  });

  afterAll(async () => {
    await Category.deleteMany({});
    await disconnect();
  });

  beforeEach(async () => {
    testCat = new Category({ name: "Test Category" });
    return testCat.save();
  });

  afterEach(async () => {
    return Category.findByIdAndDelete(testCat._id);
  });

  it("GET all categories test", () => {
    return request(app)
      .get("/category/read")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject(
          JSON.parse(JSON.stringify([testCat.toObject()]))
        );
      });
  });

  it("GET one category test", () => {
    return request(app)
      .get(`/category/read/${testCat._id}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject(
          JSON.parse(JSON.stringify(testCat.toObject()))
        );
      });
  });

  it("POST category test", (done) => {
    let newCat = { name: "New Category" };
    return request(app)
      .post("/category/create")
      .send(newCat)
      .then(async (response) => {
        let saved = await Category.find(newCat).exec();
        expect(response.statusCode).toBe(200);
        expect([response.body]).toMatchObject(
          JSON.parse(JSON.stringify(saved))
        );
        await Category.findByIdAndDelete(saved._id);
        done();
      });
  });

  it("PUT category test", () => {
    let updatedCat = { name: "Updated Category" };
    return request(app)
      .put(`/category/update/${testCat._id}`)
      .send(updatedCat)
      .then(async (response) => {
        let updated = await Category.find(updatedCat).exec();
        expect(response.statusCode).toBe(200);
        expect([response.body]).toMatchObject(
          JSON.parse(JSON.stringify(updated))
        );
      });
  });

  it("DELETE category test", () => {
    return request(app)
      .del(`/category/delete/${testCat._id}`)
      .then(async (response) => {
        expect(response.statusCode).toBe(200);
        expect(await Category.exists({ _id: testCat._id })).toBeFalse();
      });
  });
});
