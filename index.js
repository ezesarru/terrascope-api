const server = require("./src/server");
const { connection } = require("./src/db");
const saveData = require("./api/saveData");
require("dotenv").config();
const { PORT } = process.env;

(startServer = async () => {
  try {
    await connection.sync({ force: false }); // true borra
    await saveData();
    server.listen(PORT, () => console.log(`Server raised in port: ${PORT}`));
  } catch (error) {
    console.error("Server not started", error);
  }
})();
