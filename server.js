const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const registerAdmin= require("./src/service/Register/registerAdmin");
const registerUser = require("./src/service/Register/registerUser");
const routes = require("./src/service/routes");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`El servidor está inicializado en el puerto ${ PORT }`);
 });
 
app.use(cors());
// app.use((req, res, next) => {
//   // En dado caso para usar esta parte del codigo el Access-Control-Allow-Origin tiene que tener su host
//   res.header("Access-Control-Allow-Origin", 'https://coldchainsecurity.herokuapp.com/');
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//   res.header("Access-Control-Allow-Headers", "Authorization, Origin,X-Requested-With,Content-Type,Accept,content-type,application/json,X-Access-Token");
//   if ('OPTIONS' == req.method) {
//       res.send(200);
//   } else {
//       next();
//   }
// });

routes.assignRoutes(app);