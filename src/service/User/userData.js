const Pool = require('pg').Pool

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});
//$3integer
const _createUser = "SELECT create_user($1 , $2 , $3 , $4 , $5 , $6);";
const _getUserByID = "SELECT * FROM users WHERE usu_cedula = $1";
// const _getAllUsers = "";
const _updateUser = "SELECT update_user($1 , $2 , $3 , $4 , $5 , $6);";
const _deleteUser = "";

const getUsers_ = async(req, res) => {
  try {
    const response = await pool.query("SELECT * FROM usuario;");
    res.status(200).send(response.rows);
  } catch (error) {
    res.status(404).send(error);
  }
}

const getUserById_ = async (req, res) => {
  const id = parseInt(req.body.cedula)

  // pool.query(_getUserByID, [id], (error, results) => {
  //   if (error) {
  //     throw error
  //   }
  //   response.status(200).json(results.rows)
  // })

  try {
    const response = await pool.query(_getUserByID, [id]);
    res.status(200).send(response.rows);
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


    addData : function( req, res) {
        var nombre = req.body.name;
        var apellido = req.body.lastname;
        var cedula = req.body.id;
        var cargo = req.body.position;
        var usuario = req.body.user;
        var contrasena = req.body.password;

        data.push({'name': nombre,
                   'lastname': apellido,
                   'id': cedula,
                   'position': cargo,
                   'user': usuario,
                   'password': contrasena
                });
        res.send(data);
    },

    getUsers_,
    getUserById_,


};