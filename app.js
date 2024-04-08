const express = require("express");
const cors = require("cors");
const routes = require("./src/routes/routes");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const { env } = require("process");

const app = express();

// Logging configuration
const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" });
const stdoutLogStream = fs.createWriteStream(path.join(__dirname, "stdout.log"), { flags: "a" });
const errorLogStream = fs.createWriteStream(path.join(__dirname, "error.log"), { flags: "a" });

if (env.NODE_ENV === "production") {
    app.use(morgan("common", { stream: accessLogStream }));
    process.stdout.write = stdoutLogStream.write.bind(stdoutLogStream);
    process.stderr.write = errorLogStream.write.bind(errorLogStream);
}

// Origin configuration
app.use(cors());

// Application configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes configuration
app.use(routes);

module.exports = app;