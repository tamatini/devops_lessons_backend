const { expect } = require('chai');
const request = require('supertest');
const app = require('../../app');
const { setup, postLesson } = require('../test-helper');

const url = "/lesson";

describe('DELETE /lesson/:id', () => {
    setup();

    it ('should return a status code 200', async() => {
        const newLesson = await postLesson('Lesson 1');
        const res = await request(app).delete(url+"/"+newLesson._id);	
        expect(res.statusCode).to.equal(200);
    });
});