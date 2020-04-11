const Pool = require('pg').Pool
const moment = require("moment")
const helper = require("../Login/Controller/helper")

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
        res.status(404).send({'message' : error});
      }

    },

    getUserByID : async function(req, res){
      const cedula = req.params['id']
      try {
        const response = await pool.query(_getUserByID, [cedula]);
        res.status(200).send(response.rows);
      } catch (error) {
        res.status(404).send({'message' : error});
      }

    },

    createUser : async function (req, res){
        if (!req.body.username || !req.body.password) {
          return res.status(400).send({'message': 'Introduzca Username y/o Contraseña'});
        }

        // if (!Helper.isValidEmail(req.body.email)) {
        //   return res.status(400).send({ 'message': '' });
        // }

        const hashPassword = Helper.hashPassword(req.body.password);
        const { nombre, apellido, cedula, cargo, username} = req.body
        try{
          const response = await pool.query( _createUser , [ nombre, 
                                                            apellido, 
                                                            cedula, 
                                                            cargo, 
                                                            username, 
                                                            hashPassword,
                                                            moment(new Date()),
                                                            moment(new Date())]);         
          res.status(201).send({'message':'Usuario creado exitosamente'});
        } catch(error){
          if (error.routine === '_bt_check_unique') {
            return res.status(400).send({ 'message': 'El usuario ya existe (username)' })
          }
          res.status(404).send({'message' : error});
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
        res.status(404).send({'message' : error});
      }
    },

    deleteUser : async function(req, res){
      const { cedula } = req.body
      try {
        const response = await pool.query(_deleteUser, [cedula]);
        res.status(204).send({'message':'Usuario eliminado exitosamente'});
      } catch (error) {
        res.status(404).send({'message' : error});
      }

    }
};