const Router = require("express").Router();
const userController = require("../controllers/user.controller");

Router.get("/", userController.getUsers);

module.exports = Router;