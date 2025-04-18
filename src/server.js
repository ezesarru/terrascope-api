const express = require("express");
const server = express();
const morgan = require("morgan");
const cors = require("cors");
const router = require("./routes/routesIndex");
const helmet = require("helmet");
require("dotenv").config();
const { WEB_URL } = process.env;

server.use(helmet()); // HTTP receptor
server.use(express.json()); // JSON reader
server.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded data parser
server.use(morgan("dev")); // Console request status
server.use(
  cors({
    origin: WEB_URL,
    credentials: true,
  })
);
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", WEB_URL);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header( 
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
server.use(router);
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

module.exports = server;
