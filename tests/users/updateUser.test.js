const { expect } = require('chai');
const request = require('supertest');
const app = require('../../app');
const { setup, postUser } = require('../test-helper');

const url = "/users";
const updatedUser = {
    username: 'JohnDoe',
    email: 'johndoe@mail.fr',
    password: 'Password34',
    firstName: 'Johnny',
    lastName: 'Doe'
}

describe('PUT /users/:id', () => {
    setup();

    it('should return status code 201', async() => {
        const user = await postUser();
        const res = await request(app).put(url+"/"+user._id).send(updatedUser);
        expect(res.status).to.equal(201);
    })

    it('should return a json response', async() => {
        const user = await postUser();
        const res = await request(app).put(url+"/"+user._id).send(updatedUser);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message', 'User has been updated');
    })

    it('should return an error if firstName is missing', async() => {
        const user = await postUser();
        const res = await request(app).put(url+"/"+user._id).send({
            lastName: updatedUser.lastName
        });
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message', 'Firstname is required');
    })

    it('should return an error if lastname is missing', async() => {
        const user = await postUser();
        const res = await request(app).put(url+"/"+user._id).send({
            firstName: updatedUser.firstName
        })
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message', 'Lastname is required');
    })
});