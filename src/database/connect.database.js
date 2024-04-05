const mongoose = require("mongoose");

const connect = async (MONGO_DB, MONGO_URL) => {
  mongoose
    .connect(MONGO_URL + "/" + MONGO_DB)
    .then(() => {
      console.log(`Connected to ${MONGO_DB} database`);
    })
    .catch((err) => {
      console.error(`Error connecting to ${MONGO_DB} database: ${err}`);
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
