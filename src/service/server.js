const express = require("express");
const bodyParser = require("body-parser");
const routesArduino = require("./Arduino/routesArduinoData");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

routesArduino.assignRoutes(app);

app.listen(PORT, () => {
  console.log(`El servidor está inicializado en el puerto ${ PORT }`);
 });

module.exports = app;