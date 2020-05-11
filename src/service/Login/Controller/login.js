const helper =  require("./helper");
const Pool = require('pg').Pool;

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

const _getUserByUsername = "SELECT * FROM usuario where usu_usuario = $1;";
const _getRolByName = "SELECT * FROM rol where rol_id = $1;"

module.exports = {

    login : async function(req, res){
        if (!req.body.username || !req.body.password) {
            return res.status(400).send({'message': 'No introdujo su nombre de usuario o contraseña'});
        }

        try {
            const response = await pool.query(_getUserByUsername, [req.body.username])
            if (!response.rows[0]) {
                res.status(400).send({'message': 'Las credenciales introducidas son incorrectas'});
            }

            if(!helper.comparePassword(response.rows[0].usu_contrasena, req.body.password)) {
                res.status(400).send({ 'message': 'Su contraseña introducida es incorrecta' });
            }
            
            const rol = await pool.query(_getRolByName,[response.rows[0].usu_rol_fk])
            const token = helper.generateToken(response.rows[0].usu_id);
            res.status(200).send({  token , 
                                    'rol' : rol.rows[0].rol_tipo , 
                                    'id_comercio': response.rows[0].usu_compania_fk,
                                    'cedula_usuario:' : response.rows[0].usu_cedula
                                });

        } catch (error) {
            res.status(404).send({'message' : error});
        }


    },

    logout: async function(req, res){

    }

}
