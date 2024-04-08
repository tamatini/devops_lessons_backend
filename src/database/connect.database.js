const mongoose = require("mongoose");

const connect = async (db, name) => {
  console.log("database url: ", db)
  mongoose
    .connect(db)
    .then(() => {
      console.log(`Connected to ${name} database`);
    })
    .catch((err) => {
      console.error(`Error connecting to ${name} database: ${err}`);
    });
};

const close = async () => {
  mongoose.connection
    .close()
    .catch((err) => {
      console.error(`Error closing database connection: ${err}`);
    });
};

const clearDatabase = async () => {
    try {
        const collections = mongoose.connection.collections;
        for (const key in collections) {
          const collection = collections[key];
          mongoose.connection.dropCollection(collection.name);
        }
        
    } catch (error) {
        console.error(`Error clearing database: ${error}`);
    }
};

const connectInMemory = async () => {
  const { MongoMemoryServer } = require("mongodb-memory-server");
  try {
    const mockDB = await MongoMemoryServer.create();
    const uri = mockDB.getUri();
    await mongoose.connect(uri);
  } catch (error) {
    console.error(`Error connecting to in-memory database: ${error}`);
  }
};

module.exports = {
  connect,
  close,
  clearDatabase,
  connectInMemory,
};
