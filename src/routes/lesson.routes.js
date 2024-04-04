const Router = require("express").Router();
const lessonController = require("../controllers/lesson.controller");

Router.get("/", lessonController.getLessons);
Router.post("/", lessonController.postLesson);
Router.get("/hello", lessonController.helloLesson);
Router.get("/:id", lessonController.getSingleLesson);
Router.put("/:id", lessonController.updateLesson);
Router.delete("/:id", lessonController.deleteLesson);

module.exports = Router;
