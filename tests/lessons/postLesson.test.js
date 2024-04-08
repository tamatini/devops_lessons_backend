const { expect } = require("chai");
const request = require("supertest");
const app = require("../../app");
const { setup, postLesson } = require("../test-helper");

const url = "/lessons/new";

describe("POST /lessons", () => {
  setup();

  it("Should return a 201 status code", async () => {
    const res = await request(app).post(url).send({
      title: "Lesson 1",
      content: "This is a test lesson",
      isPublished: false,
    });
    expect(res.status).to.equal(201);
  });

  it("Should return error if title is missing", async () => {
    const res = await request(app).post(url).send({
      content: "This is a test lesson",
      isPublished: false,
    });
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("message", "Title is required");
  });

  it("Should return error if content is missing", async () => {
    const res = await request(app).post(url).send({
      title: "Lesson 1",
      isPublished: false,
    });
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("message", "Content is required");
  });

  it("Should return error if isPublished is missing", async () => {
    const res = await request(app).post(url).send({
      title: "Lesson 1",
      content: "This is a test lesson",
    });
    expect(res.status).to.equal(400);
    expect(res.body).to.have.property("message", "Lesson must be published or not");
  });
});
