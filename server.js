const app = require("./app");
const dotenv = require("dotenv");
const PORT = 3000;
const database = require("./src/database/connect.database");

const start = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  database.connect("lesson", "localhost", "admin", "password", "8081");
};

if (require.main === module) {
  start();
}
