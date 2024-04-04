const { expect } = require('chai');
const request = require('supertest');
const app = require('../../app');
const { setup, postLesson } = require('../test-helper');

const url = "/lesson";

describe('PUT /lesson', () => {
    setup();

    it ('should return a 200 status code', async() => {
        const lesson = await postLesson('Lesson 1');
        const res = await request(app).put(url+"/"+lesson._id).send({
            title: "Lesson 2",
            content: "This is a test lesson",
            isPublished: true
        });
        expect(res.status).to.equal(200);
    });

    it ('should return a message', async() => {
        const lesson = await postLesson('Lesson 1');
        const res = await request(app).put(url+"/"+lesson._id).send({
            title: "Lesson 2",
            content: "This is a test lesson",
            isPublished: true
        });
        expect(res.body).to.have.property('message', 'Lesson updated');
    });

    it ('should return error if title is missing', async() => {
        const lesson = await postLesson('Lesson 1');
        const res = await request(app).put(url+"/"+lesson._id).send({
            content: "This is a test lesson",
            isPublished: true
        });
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message', 'Title is required');
    });

    it ('should return error if content is missing', async() => {
        const lesson = await postLesson('Lesson 1');
        const res = await request(app).put(url+"/"+lesson._id).send({
            title: "Lesson 2",
            isPublished: true
        });
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message', 'Content is required');
    });

    it ('should return error if isPublished is missing', async() => {
        const lesson = await postLesson('Lesson 1');
        const res = await request(app).put(url+"/"+lesson._id).send({
            title: "Lesson 2",
            content: "This is a test lesson"
        });
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message', 'Lesson must be published or not');
    });
});