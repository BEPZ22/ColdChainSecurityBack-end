const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./src/service/routes");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

//routesArduino.assignRoutes(app);
//routesMapa.assignRoutes(app);
routes.assignRoutes(app);

app.listen(PORT, () => {
  console.log(`El servidor está inicializado en el puerto ${ PORT }`);
 });

module.exports = app;