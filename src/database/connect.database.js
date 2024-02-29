const mongoose = require('mongoose');

const connect = async (db, name) => {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    };

    mongoose.connect(db, options)
        .then(() => {
            console.log(`Connected to ${name} database`);
        })
        .catch((err) => {
            console.error(`Error connecting to ${name} database: ${err}`);
        });
}

const close = async () => {
    mongoose.connection.close()
    .then(() => {
        console.log('Connection to database closed');
    })
    .catch((err) => {
        console.error(`Error closing database connection: ${err}`);
    });
}

const clearDatabase = async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany(null, null, (err) => {
            if (err) {
                console.error(`Error clearing database: ${err}`);
            }
        });
    }
}

module.exports = {
    connect,
    close,
    clearDatabase
}