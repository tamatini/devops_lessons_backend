const Router = require("express").Router();
const userController = require("../controllers/user.controller");

Router.get("/", userController.getUsers);
Router.get('/:id', userController.getSingleUser);

module.exports = Router;