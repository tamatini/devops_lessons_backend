const { expect } = require('chai');
const request = require('supertest');
const app = require('../../app');
const { setup, postLesson } = require('../test-helper');

const url = "/lesson";

describe('GET /lessons', () => {
    setup();

    it ('should return a json response', async() => {
        const res = await request(app).get(url+"/hello");
        expect(res.body).is.an('object');
    });

    it ('should return a 200 status code', async() => {
        const res = await request(app).get(url+"/hello");
        expect(res.statusCode).to.equal(200);
    });

    it ('should return a message', async() => {
        const res = await request(app).get(url+"/hello");
        expect(res.body).to.have.property('message', 'Hello from the lesson controller!');
    });

    it ('should return a list of lessons', async() => {
        await postLesson('Lesson 1');
        const res = await request(app).get(url); 
        expect(res.body).to.be.an('array');
    });

    it ('should return a emty array if no lessons', async() => {
        const res = await request(app).get(url);
        expect(res.body).to.be.an('array').that.is.empty;
    });

    it ('array should contain a lesson object', async() => {
        await postLesson('Lesson 1');
        const res = await request(app).get(url);
        expect(res.body[0]).to.be.an('object');
    });

    it ('lesson should have good format', async() => {
        await postLesson('Lesson 1');
        const res = await request(app).get(url);
        expect(res.body[0]).to.have.property('_id');
        expect(res.body[0]).to.have.property('title', 'Lesson 1');
        expect(res.body[0]).to.have.property('content', 'This is a test lesson');
        expect(res.body[0]).to.have.property('isPublished', false);
    });
});
