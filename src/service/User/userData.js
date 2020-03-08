const Pool = require('pg').Pool

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

const _createUser = "SELECT create_user( $1 , $2 , $3 , $4 , $5 , $6 );";
const _getUserByID = "SELECT * FROM usuario WHERE usu_cedula = $1";
const _getAllUsers = "SELECT * FROM usuario;";
const _updateUser = "SELECT update_user( $1 , $2 , $3 , $4 , $5 , $6 );";
const _deleteUser = "SELECT delete_user( $1 );";

module.exports = {

    getAllUsers : async function(req, res) {
      try {
        const response = await pool.query(_getAllUsers);
        res.status(200).send(response.rows);
      } catch (error) {
        res.status(404).send(error);
      }

    },

    getUserByID : async function(req, res){

      const { cedula } = req.body

      try {
        const response = await pool.query(_getUserByID, [cedula]);
        res.status(200).send(response.rows);
      } catch (error) {
        res.status(404).send(error);
      }

    },

    createUser : async function (req, res){

        const { nombre, apellido, cedula, cargo, username, password } = req.body
        try{
          const response = await pool.query( _createUser , [ nombre, 
                                                       apellido, 
                                                       cedula, 
                                                       cargo, 
                                                       username, 
                                                       password]);                   
          res.status(200).send({'message':'Usuario creado exitosamente'});
        } catch(error){
          res.status(404).send(error);
        }

    },

    updateUser : async function(req, res){
      const { nombre, apellido, cedula, cargo, username, password } = req.body
      try {
        const response = await pool.query(_updateUser, [ nombre,
                                                         apellido,
                                                         cedula,
                                                         cargo,
                                                         username,
                                                         password]);
        res.status(200).send(response.rows);
      } catch (error) {
        res.status(404).send(error);
      }
    },

    deleteUser : async function(req, res){

      const { cedula } = req.body

      try {
        const response = await pool.query(_deleteUser, [cedula]);
        res.status(200).send({'message':'Usuario eliminado exitosamente'});
      } catch (error) {
        res.status(404).send(error);
      }

    }
};