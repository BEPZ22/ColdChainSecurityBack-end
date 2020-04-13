const jwt =  require("jsonwebtoken");
const Pool = require('pg').Pool;

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

const _getUserByID = "SELECT * FROM usuario WHERE usu_id = $1";

module.exports = {

    verifyToken :  async function(req, res, next){
        
        const token = req.headers['x-access-token'].split(" ")[1];
        console.log(token, "\n")
        const tokenized = token.split(" ")[1];
        console.log(tokenized)
        if(!token) {
          res.status(400).send({ 'message': 'Se necesita un Token para proseguir' });
        }
        
        try {
          
          const decoded = await jwt.verify(tokenized, process.env.SECRET);
          const response = await db.query(_getUserByID, [decoded.userId]);
          
          if(!response.rows[0]) {
            res.status(400).send({ 'message': 'Token invalido' });
          }
          req.user = { id: decoded.userId };
          next();
        } catch(error) {
          res.status(400).send(error);
        }
    }

}