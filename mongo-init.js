db = db.getSiblingDB("lessons");

db.createCollection("lessons");
db.lessons.insertMany([
    {
        title: "Lesson 1",
        content: "This is a test lesson",
        isPublished: true
    },
    {
        title: "Lesson 2",
        content: "This is a test lesson",
        isPublished: true
    },
    {
        title: "Lesson 3",
        content: "This is a test lesson",
        isPublished: false
    },
    {
        title: "Lesson 4",
        content: "This is a test lesson",
        isPublished: false
    },
    {
        title: "Lesson 5",
        content: "This is a test lesson",
        isPublished: true
    }
]);

db.createUser(
    {
        user: "admin",
        pwd: "password",
        roles: [
            {
                role: "readWrite",
                db: "lessons"
            }
        ]
    }
)