const database = require('../src/database/connect.database');

const setup = () => {
    before(async () => {
        try {
            await database.connectInMemory();
        } catch (error) {
            console.error(`Error connecting to in-memory database: ${error}`);
        }
    })
    
    afterEach(async () => {
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
};

const postLesson = async (lesson) => {
    const Lesson = require('../src/models/lesson.model');
    try {
        const newLesson = new Lesson({
            title: lesson,
            content: 'This is a test lesson',
            isPublished: false
        });
        return await newLesson.save();
    } catch (error) {
        console.error(`Error posting lesson: ${error}`);
    }
}

const postUser = async () => {
    const User = require('../src/models/user.model');
    try {
        const newUser = new User({
            username: 'JohnDoe',
            email: 'john.doe@mail.fr',
            password: 'Password34',
            firstName: 'John',
            lastName: 'Doe',
        });
        return await newUser.save();

    } catch (error) {
        console.error(`Error posting user: ${error}`);
    }

}

module.exports = {
    setup,
    postLesson,
    postUser
};