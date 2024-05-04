const app = require("./app");
const dotenv = require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });
const PORT = process.env.PORT;
const database = require("./src/database/connect.database");
const { MONGO_URL, MONGO_DB } = process.env;

const start = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  database.connect(MONGO_URL, MONGO_DB);
};

if (require.main === module) {
  start();
}
