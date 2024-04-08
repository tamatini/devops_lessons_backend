const { expect } = require("chai");
const request = require("supertest");
const app = require("../../app");
const { setup, postLesson } = require("../test-helper");

const url = "/lessons";

describe("GET /lessons", () => {
  setup();

  it("should return a list of lessons", async () => {
    await postLesson("Lesson 1");
    const res = await request(app).get(url);
    expect(res.body).to.be.an("array");
  });

  it("should return a emty array if no lessons", async () => {
    const res = await request(app).get(url);
    expect(res.body).to.be.an("array").that.is.empty;
  });

  it("array should contain a lesson object", async () => {
    await postLesson("Lesson 1");
    const res = await request(app).get(url);
    expect(res.body[0]).to.be.an("object");
  });

  it("lesson should have good format", async () => {
    await postLesson("Lesson 1");
    const res = await request(app).get(url);
    expect(res.body[0]).to.have.property("_id");
    expect(res.body[0]).to.have.property("title", "Lesson 1");
    expect(res.body[0]).to.have.property("content", "This is a test lesson");
    expect(res.body[0]).to.have.property("isPublished", false);
  });
});
