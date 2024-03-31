const database = require('../src/database/connect.database');
const Lesson = require('../src/models/lesson.model');

const setup = () => {
    before(async () => {
        try {
            await database.connectInMemory();
        } catch (error) {
            console.error(`Error connecting to in-memory database: ${error}`);
        }
    })


    beforeEach(async () => {
        try {
            await database.clearDatabase();
        } catch (error) {
            console.error(`Error clearing database: ${error}`);
        }
    })

    after(async () => {
        try {
            await database.close();
        } catch (error) {
            console.error(`Error closing database connection: ${error}`);
        }
    })
}

postLesson = async (lesson) => {
    const newLesson = new Lesson({
        title: lesson,
        content: 'This is a test lesson',
        isPublished: false
    });

    return await newLesson.save();
}

module.exports = {
    setup,
    postLesson
};