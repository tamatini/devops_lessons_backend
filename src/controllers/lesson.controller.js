const Lessons = require("../models/lesson.model");

const helloLesson = (req, res) => {
  res.status(200).json({ message: "Hello from the lesson controller!" });
};

const getLessons = async (req, res) => {
  try {
    const lessons = await Lessons.find();
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleLesson = async (req, res) => {
  try {
    const lesson = await Lessons.findById(req.params.id);
    res.status(200).json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postLesson = async (req, res) => {
  try {
    const body = req.body;

    if (!body.title || body.title === "") {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    if (!body.content || body.content === "") {
      return res.status(400).json({
        message: "Content is required",
      });
    }

    if (body.isPublished === undefined) {
      return res.status(400).json({
        message: "Lesson must be published or not",
      });
    }

    const newLesson = new Lessons({
      title: req.body.title,
      content: req.body.content,
      isPublished: req.body.isPublished,
    });
    await newLesson.save();
    res.status(201).json(newLesson);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateLesson = async (req, res) => {
  try {
    const body = req.body;

    if (!body.title || body.title === "") {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    if (!body.content || body.content === "") {
      return res.status(400).json({
        message: "Content is required",
      });
    }

    if (body.isPublished === undefined) {
      return res.status(400).json({
        message: "Lesson must be published or not",
      });
    }

    const lesson = await Lessons.findById(req.params.id);
    lesson.title = req.body.title;
    lesson.content = req.body.content;
    lesson.isPublished = req.body.isPublished;
    await lesson.save();
    res.status(200).json({ message: "Lesson updated" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

const deleteLesson = async (req, res) => {
  try {
    await Lessons.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Lesson deleted" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  helloLesson,
  getLessons,
  getSingleLesson,
  postLesson,
  updateLesson,
  deleteLesson,
};
