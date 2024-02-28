const { expect } = require('chai');
const request = require('supertest');
const app = require('../../app');

const url = "/lesson";

describe('GET /lessons', () => {
    it ('should return a json response', async() => {
        const res = await request(app).get(url);
        expect(res.body).is.an('object');
    });

    it ('should return a 200 status code', async() => {
        const res = await request(app).get(url);
        expect(res.statusCode).to.equal(200);
    });

    it ('should return a message', async() => {
        const res = await request(app).get(url);
        expect(res.body).to.have.property('message', 'Hello from the lesson controller!');
    });
});