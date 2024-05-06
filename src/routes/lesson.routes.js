const Router = require("express").Router();
const lessonController = require("../controllers/lesson.controller");

Router.get("/", lessonController.getLessons);
Router.post("/new", lessonController.postLesson);
Router.get("/:id", lessonController.getSingleLesson);
Router.delete("/:id", lessonController.deleteLesson);
Router.put("/:id", lessonController.updateLesson);

module.exports = Router;
