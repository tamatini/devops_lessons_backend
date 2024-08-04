const Router = require("express").Router();
const userController = require("../controllers/user.controller");

Router.get("/", userController.getUsers);
Router.post("/new", userController.postUser);
Router.get('/:id', userController.getSingleUser);
Router.put('/:id', userController.updateUser);

module.exports = Router;