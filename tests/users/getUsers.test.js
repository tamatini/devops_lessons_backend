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

  it("should return status code 200", async () => {
    await postUser();
    const res = await request(app).get(url);
    expect(res.status).to.equal(200);
  });

  it("should return an empty array", async () => {
    const res = await request(app).get(url);
    expect(res.body).to.be.an("array").that.is.empty;
  });

  it("should return a list of users", async () => {
    await postUser();
    const res = await request(app).get(url);
    console.log
    expect(res.body[0]).to.have.property("username", "JohnDoe");
    expect(res.body[0]).to.have.property("email", "john.doe@mail.fr");
    expect(res.body[0]).to.have.property("password");
    expect(res.body[0]).to.have.property("firstName", "John");
    expect(res.body[0]).to.have.property("lastName", "Doe");
  });
});