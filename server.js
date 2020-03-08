const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./src/service/routes");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`El servidor está inicializado en el puerto ${ PORT }`);
 });
 
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header("Access-Control-Allow-Headers", "Authorization, Origin,X-Requested-With,Content-Type,Accept,content-type,application/json");
  if ('OPTIONS' == req.method) {
      res.send(200);
  } else {
      next();
  }
});

routes.assignRoutes(app);