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

const _createUser = "SELECT create_user( $1 , $2 , $3 , $4 , $5 , $6 ,$7, $8 );";
const _getUserByID = "SELECT (g).* FROM (SELECT get_user_by_id($1 , $2) AS g) as func;";
const _getUserByUsername = "SELECT usu_id FROM usuario where usu_usuario = $1;";
const _getAllUsers = "SELECT (g).* FROM (SELECT get_all_user($1 , $2) AS g) as func;";
const _updateUser = "SELECT update_user( $1 , $2 , $3 , $4 , $5 , $6 ,$7, $8);";
const _deleteUser = "SELECT delete_user( $1 );";

module.exports = {

    getAllUsers : async function(req, res) {
      const rol = req.params['rol'];
      const id_comercio = req.params['comercio'];
      try {
        const response = await pool.query(_getAllUsers, [rol,id_comercio]);
        return res.status(200).send(response.rows);
      } catch (error) {
        res.status(404).send({'message' : error});
      }

    },

    getUserByID : async function(req, res){
      const cedula = req.params['id'];
      const rol = req.params['rol'];
      try {
        const response = await pool.query(_getUserByID, [cedula, rol]);
        res.status(200).send(response.rows);
      } catch (error) {
        res.status(404).send({'message' : error});
      }

    },    
    
    createUser : async function (req, res){
      const hashPassword = helper.hashPassword(req.body.password);
      const { nombre, apellido, cedula, cargo, username, horario, comercio} = req.body;
      const validacion = await pool.query(_getUserByUsername, [username]);

      if (!req.body.username || !req.body.password) {
        res.status(400).send({'message': 'Introduzca Username y/o Contraseña'});
      }

      if (!validacion) {
        res.status(400).send({'message': 'El usuario ya existe'});
      }  
      try{
        const response = await pool.query( _createUser , [ nombre, 
                                                          apellido, 
                                                          cedula, 
                                                          cargo, 
                                                          username, 
                                                          hashPassword,
                                                          horario,
                                                          comercio]);         
        res.status(201).send({'message':'Usuario creado exitosamente'});
      } catch(error){
        res.status(404).send({'message' : error});
      }

    },

    updateUser : async function(req, res){
      const hashPassword = helper.hashPassword(req.body.password);
      const { nombre, apellido, cedula, cargo, username, horario, cedulaOriginal} = req.body
      try {
        const response = await pool.query(_updateUser, [ nombre,
                                                         apellido,
                                                         cedula,
                                                         cargo,
                                                         username,
                                                         hashPassword,
                                                         horario,
                                                         cedulaOriginal]);
        res.status(200).send(response.rows);
      } catch (error) {
        res.status(404).send({'message' : error});
      }
    },

    deleteUser : async function(req, res){
      const { cedula } = req.body
      try {
        const response = await pool.query(_deleteUser, [cedula]);
        res.status(200).send({'message':'Usuario eliminado exitosamente'});
      } catch (error) {
        res.status(404).send({'message' : error});
      }

    }
};