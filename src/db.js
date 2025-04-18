const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const pg = require("pg")
require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, ENVIRONMENT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  logging: false,
  schema: 'public',
  dialectModule: pg,
  dialectOptions: {
    ssl: ENVIRONMENT === 'PROD' ? {
      require: true,
      rejectUnauthorized: false
    } : false
  }
});

sequelize
  .authenticate()
  .then(() => console.log("Successful connection"))
  .catch((error) => console.error("Failed connection", error));

const basename = path.basename(__filename);
const modelDefiners = [];
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, "/models", file));
    modelDefiners.push(model);
  });

modelDefiners.forEach((model) => model(sequelize));

module.exports = { ...sequelize.models, connection: sequelize };
