const { expect } = require('chai');
const request = require('supertest');
const app = require('../../app');
const { setup, postLesson } = require('../test-helper');

const url = "/lesson/delete/";

describe('DELETE /lesson/delete/:id', () => {
    setup();

    it ('should return a status code 200', async() => {
        const newLesson = await postLesson('Lesson 1');
        const res = await request(app).delete(url+newLesson._id);	
        expect(res.statusCode).to.equal(200);
    });

    it ('should return a status code 404 if lesson not found', async() => {
        const res = await request(app).delete(url+"/delete?id=123456789012345678901234");
        expect(res.statusCode).to.equal(404);
    });

    it ('should return a status code 404 if id is missing', async() => {
        const res = await request(app).delete(url);
        expect(res.statusCode).to.equal(404);
    });
});