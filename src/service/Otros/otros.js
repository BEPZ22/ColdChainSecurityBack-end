const Pool = require('pg').Pool

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

const _getAllRol = "SELECT * FROM get_rol( $1 );";
const _getAllEmployeeSchedule = "SELECT hor_emp_descripcion FROM horario_empleado;";
const _getAllCommerceSchedule = "SELECT hor_com_descripcion FROM horario_comercio;";

module.exports = {

    getAllRol : async function(req, res) {
      const rol = req.params['rol'];   
        try {
          const response = await pool.query( _getAllRol,[rol] );
          res.status(200).send(response.rows);
        } catch (error) {
          res.status(404).send(error);
        }
  
      },
  
      getAllEmployeeSchedule : async function(req, res){
        try {
          const response = await pool.query( _getAllEmployeeSchedule );
          res.status(200).send(response.rows);
        } catch (error) {
          res.status(404).send(error);
        }
  
      },
  
      getAllCommerceSchedule : async function (req, res){
          try{
            const response = await pool.query( _getAllCommerceSchedule );                   
            res.status(200).send(response.rows);
          } catch(error){
            res.status(404).send(error);
          }
  
      },

      getUrlMap : async function(req, res){
        try{                
          res.status(200).send(process.env.GOOGLE_MAPS);
        } catch(error){
          res.status(404).send(error);
        }
      }


}