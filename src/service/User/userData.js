const Pool = require('pg').Pool

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});
//$3integer
const _createUser = "SELECT create_user( $1 , $2 , $3 , $4 , $5 , $6 );";
const _getUserByID = "SELECT * FROM usuario WHERE usu_cedula = $1";
// const _getAllUsers = "";
const _updateUser = "SELECT update_user( $1 , $2 , $3 , $4 , $5 , $6 );";
const _deleteUser = "SELECT delete_user( $1 );";

const getUsers_ = async(req, res) => {
  try {
    const response = await pool.query("SELECT * FROM usuario;");
    res.status(200).send(response.rows);
  } catch (error) {
    res.status(404).send(error);
  }
}

const getUserById_ = async (req, res) => {
  const { cedula } = req.body
  try {
    const response = await pool.query(_getUserByID, [cedula]);
    res.status(200).send(response.rows);
  } catch (error) {
    res.status(404).send(error);
  }
}

const updateUser_ = async (req, res) => {
  const { nombre, apellido, cedula, cargo, username, password } = req.body
  try {
    const response = await pool.query(_updateUser, [ nombre,
                                                     apellido,
                                                     cedula,
                                                     cargo,
                                                     username,
                                                     password]);
    res.status(200).send('Usuario actualizado exitosamente');
  } catch (error) {
    res.status(404).send(error);
  }
}

module.exports = {

    getData : function(req, res){
        res.send("hola jejeje");
    },

    getAllUsers : function(req, res){
      // pool.query(_getAllUsers,(error, results) => {
      //   if (error) {
      //     throw error
      //   }
      //   res.status(200).send(results.rows)
      // })
      // res.send("hola jejeje");
      // pool.query(_getAllUsers)
      //   .then(response => {
      //       res.status(200).send(response.rows);
      //       pool.end()
      //   })
      //   .catch(err => {
      //     res.status(404).send('No se encontro informacion')
      //     pool.end()
      //   })
      
    },

    getUserByID : function(req, res){
      res.send("hola jejeje");
    },

    createUser : function (req, res){

        const { nombre, apellido, cedula, cargo, username, password } = req.body

        pool.query( _createUser , 
                    [
                        nombre, 
                        apellido, 
                        cedula, 
                        cargo, 
                        username, 
                        password
                    ],
                      (error, results) => {
                        if (error) {
                          throw error
                        }
                        // res.status(201).send(`User added with ID: ${result.insertId}`)
                      });                   
       res.status(200).send('Usuario registrado exitosamente')
    },
    getUsers_,
    getUserById_,
    updateUser_,


};