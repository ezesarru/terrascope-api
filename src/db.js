const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

// SQL Connection
const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => console.log("Successful connection"))
  .catch((error) => console.error("Failed connection", error));

// Models import
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

// Initialize models
modelDefiners.forEach((model) => model(sequelize));

// Models relations
// const { example } = sequelize.models;

module.exports = { ...sequelize.models, connection: sequelize };
