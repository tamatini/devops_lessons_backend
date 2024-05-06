const { expect } = require('chai');
const request = require('supertest');
const app = require('../../app');
const { setup, postLesson } = require('../test-helper');

const url = "/lessons";

describe("GET /lessons/:id", () => {
    setup();

    it ('should return status code 200', async() => {
        const newLesson = await postLesson("Lesson 1");
        const res = await request(app).get(url+"/"+newLesson._id);
        console.log(res.body)
        expect(res.status).to.equal(200);
    });

    it ('should return a json response', async() => {
        const newLesson = await postLesson("Lesson 1");
        const res = await request(app).get(url+"/"+newLesson._id);
        expect(res.body).to.be.an('object');
    });

    it ('should return a lesson object', async() => {
        const newLesson = await postLesson("Lesson 1");
        const res = await request(app).get(url+"/"+newLesson._id);
        expect(res.body).to.have.property('_id');
        expect(res.body).to.have.property('title', 'Lesson 1');
        expect(res.body).to.have.property('content', 'This is a test lesson');
        expect(res.body).to.have.property('isPublished', false);
    });

    it ('should return a 500 status code', async() => {
        const res = await request(app).get(url+"/123");
        expect(res.status).to.equal(500);
    });

    it ('should return a error message', async() => {
        const res = await request(app).get(url+"/123");
        expect(res.body).to.have.property('message');
    });
    
});