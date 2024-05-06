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
    expect(res.status).to.equal(500);
    expect(res.body).to.have.property("message", "Validation failed: title: Title is required");
  });

  it("Should return error if content is missing", async () => {
    const res = await request(app).post(url).send({
      title: "Lesson 1",
      isPublished: false,
    });
    expect(res.status).to.equal(500);
    expect(res.body).to.have.property("message", "Validation failed: content: Content is required");
  });

  it("Should return a lesson", async () => {
    const res = await request(app).post(url).send({
      title: "Lesson 1",
      content: "This is a test lesson",
      isPublished: false,
    });
    expect(res.body).to.have.property("title", "Lesson 1");
    expect(res.body).to.have.property("content", "This is a test lesson");
    expect(res.body).to.have.property("isPublished", false);
  })
});
