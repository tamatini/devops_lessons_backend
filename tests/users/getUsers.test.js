const { expect } = require("chai");
const request = require("supertest");
const app = require("../../app");
const { setup, postUser } = require("../test-helper");

const url = "/users";

describe("GET /users", () => {
  setup();

  it("should return a list of users", async () => {
    await postUser();
    const res = await request(app).get(url);
    expect(res.body).to.be.an("array");
  });
});