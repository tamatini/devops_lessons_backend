const { expect } = require('chai');
const request = require('supertest');
const app = require('../../app');
const { setup, postUser } = require('../test-helper');

const url = "/users/new";

const user = {
    username: 'JohnDoe',
    email: 'john.doe@mail.fr',
    password: 'Password34',
    firstName: 'John',
    lastName: 'Doe',
};

describe("POST /users", () => {
    setup();

    it ('should return status code 201', async() => {
        const res = await request(app).post(url).send(user);
        expect(res.status).to.equal(201);
    })

    it ('should return a json response', async() => {
        const res = await request(app).post(url).send(user);
        expect(res.body).to.be.an('object');
    })

    it ('should return a message', async() => {
        const res = await request(app).post(url).send(user);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('User has been created');
    })

    it ('should return error if username is missing', async() => {
        const res = await request(app).post(url).send({
            email: user.email,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName
    });
        expect(res.status).to.equal(500);
        expect(res.body).to.have.property('message', 'Validation failed: username: Username is required');
    })

    it('should return error if email is missing', async() => {
        const res = await request(app).post(url).send({
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
        });
        expect(res.status).to.equal(500);
        expect(res.body).to.have.property('message', 'Validation failed: email: Email is required');
    })

    it('should return error if password is missing', async() => {
        const res = await request(app).post(url).send({
            username: user.username,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        });
        expect(res.status).to.equal(500);
        expect(res.body).to.have.property('message', 'Validation failed: password: Password is required');
    })

    it('should return error if firstName is missing', async() => {
        const res = await request(app).post(url).send({
            username: user.username,
            email: user.email,
            password: user.password,
            lastName: user.lastName,
        });
        expect(res.status).to.equal(500);
        expect(res.body).to.have.property('message', 'Validation failed: firstName: Firstname is required');
    })

    it('should return error if lastName is missing', async() => {
        const res = await request(app).post(url).send({
            username: user.username,
            email: user.email,
            password: user.password,
            firstName: user.firstName
        });
        expect(res.status).to.equal(500);
        expect(res.body).to.have.property('message', 'Validation failed: lastName: Lastname is required');
    })

    it('should return error if email is invalid', async() => {
        const res = await request(app).post(url).send({
            username: user.username,
            email: 'john.doe',
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName
        });
        expect(res.status).to.equal(500);
        expect(res.body).to.have.property('message', 'Validation failed: email: Email is invalid');
    })
});