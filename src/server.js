const express = require("express");
const server = express();
const morgan = require("morgan");
const cors = require("cors");
const router = require("./routes/routesIndex");
const helmet = require("helmet");
require("dotenv").config();
const { WEB_URL } = process.env;

// CORS configuration
const corsOptions = {
  origin: ['https://terrascope-web.vercel.app', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Apply CORS before other middleware
server.use(cors(corsOptions));
server.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));

// Add CORS headers for all responses
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://terrascope-web.vercel.app');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

server.use(router);

server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

module.exports = server;
