const server = require("./src/server");
const { connection } = require("./src/db");
const saveData = require("./api/saveData");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connection.sync({ force: false }); // true borra
    await saveData();
    server.listen(PORT, () => console.log(`Server raised in port: ${PORT}`));
  } catch (error) {
    console.error("Server not started", error);
  }
};

startServer()

module.exports = server;