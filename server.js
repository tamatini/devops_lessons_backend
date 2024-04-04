const app = require("./app");
const dotenv = require("dotenv");
const PORT = 3000;
const database = require("./src/database/connect.database");
const { MONGO_URL, MONGO_DB } = process.env;

const start = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  database.connect(MONGO_DB, MONGO_URL);
};

if (require.main === module) {
  start();
}
