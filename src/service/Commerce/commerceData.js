const Pool = require('pg').Pool

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});


const _getAllCommerce = "SELECT * FROM get_comercio($1 , $2 );";
const _getCommerceById = "SELECT * FROM get_comercio_by_id( $1 );";
const _getCommerceByName = "SELECT * FROM get_comercio_by_nombre( $1 );";
const _getCommerceByRif = "SELECT * FROM get_comercio_by_rif( $1 );";
const _getCommerceName = "SELECT com_nombre FROM comercio;";
const _createCommerce = "SELECT create_comercio( $1 , $2 , $3 , $4 , $5 , $6, $7, $8 , $9, $10, $11, $12, $13);";
const _updateCommerce = "SELECT update_comercio( $1 , $2 , $3 , $4 , $5 , $6, $7, $8 , $9, $10, $11, $12, $13, $14 );";
// const _deleteCommerce = "SELECT delete_warehouse( $1 );";

module.exports = {

  getAllCommerce : async function(req, res) {
    const rol = req.params['rol'];
    const id_comercio = req.params['comercio'];      
      try {
        const response = await pool.query(_getAllCommerce,[ rol, id_comercio ]);
        res.status(200).send(response.rows);
      } catch (error) {
        res.status(404).send(error);
      }

    },

    getCommerceById : async function(req, res){
      const id = req.params['id'];
      try {
        const response = await pool.query(_getCommerceById, [ id ]);
        res.status(200).send(response.rows);
      } catch (error) {
        res.status(404).send(error);
      }

    },

    getCommerceByName : async function(req, res){
      const name = req.params['name'];
      try {
        const response = await pool.query(_getCommerceByName, [ name ]);
        res.status(200).send(response.rows);
      } catch (error) {
        res.status(404).send(error);
      }

    },

    getCommerceByRif : async function(req, res){
      const rif = req.params['rif'];
      try {
        const response = await pool.query(_getCommerceByRif, [ rif ]);
        res.status(200).send(response.rows);
      } catch (error) {
        res.status(404).send(error);
      }

    },

    getCommerceNames : async function(req, res){
      try {
        const response = await pool.query(_getCommerceName);
        res.status(200).send(response.rows);
      } catch (error) {
        res.status(404).send(error);
      }

    },

    createCommerce : async function (req, res){

        const { descripcion, nombre, rif, avenida, calle, zona, edificio, apartamento, nro_apartameto, casa, nro_casa, lugar, horario } = req.body
        try{
          const response = await pool.query( _createCommerce , [  descripcion,
                                                                  nombre, 
                                                                  rif,
                                                                  avenida, 
                                                                  calle, 
                                                                  zona, 
                                                                  edificio, 
                                                                  apartamento, 
                                                                  nro_apartameto, 
                                                                  casa, 
                                                                  nro_casa, 
                                                                  lugar,
                                                                  horario]);                   
          res.status(200).send({'message':'Comercio creado exitosamente'});
        } catch(error){
          res.status(404).send(error);
        }

    },

    updateCommerce: async function(req, res){
      
      const { nombre, descripcion, rif, avenida, calle, zona, edificio, apartamento, nro_apartameto, casa, nro_casa, lugar, nombreCambiar, horario} = req.body
      try {
        const response = await pool.query( _updateCommerce, [ nombre,
                                                          descripcion,
                                                          rif,
                                                          avenida, 
                                                          calle, 
                                                          zona, 
                                                          edificio, 
                                                          apartamento, 
                                                          nro_apartameto, 
                                                          casa, 
                                                          nro_casa, 
                                                          lugar,
                                                          nombreCambiar,
                                                          horario]);
        res.status(200).send(response.rows);
      } catch (error) {
        res.status(404).send(error);
      }
    },

    // deleteCommerce : async function(req, res){

    //   const { placa } = req.body
    //   try {
    //     const response = await pool.query(_deleteTruck, [placa]);
    //     res.status(200).send({'message':'Comercio eliminada exitosamente'});
    //   } catch (error) {
    //     res.status(404).send(error);
    //   }

    // }


}