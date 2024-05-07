const { expect } = require('chai');
const request = require('supertest');
const app = require('../../app');
const { setup, postUser } = require('../test-helper');

const url = "/users";

describe("GET /users/:id", () => {
    setup();

    it ('should return status code 200', async() => {
        const newUser = await postUser();
        const res = await request(app).get(url+"/"+newUser._id);
        expect(res.status).to.equal(200);
    })

    it ('should return a json response', async() => {
        const newUser = await postUser();
        const res = await request(app).get(url+"/"+newUser._id);
        expect(res.body).to.be.an('object');
    })

    it ('should return a user object', async() => {
        const newUser = await postUser();
        const res = await request(app).get(url+"/"+newUser._id);
        expect(res.body).to.have.property('_id');
        expect(res.body).to.have.property('username', newUser.username);
        expect(res.body).to.have.property('email', newUser.email); 
        expect(res.body).to.have.property('password', newUser.password);
        expect(res.body).to.have.property('firstName', newUser.firstName);
        expect(res.body).to.have.property('lastName', newUser.lastName);
    })

    it ('should return a 500 status code', async() => {
        const res = await request(app).get(url+"/123");
        expect(res.status).to.equal(500);
    })

    it ('should return a error message', async() => {
        const res = await request(app).get(url+"/123");
        expect(res.body).to.have.property('message');
    })

});