const Pool = require('pg').Pool

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});


const _getAllEslabon = "SELECT * FROM get_eslabon_fijo($1 , $2 );";
const _getEslabonByIdSerial = "SELECT * FROM get_eslabon_fijo_by_serial_id( $1 );";
const _createEslabon = "SELECT create_eslabon_fijo( $1 , $2 , $3 , $4);";
// const _updateEslabon= "SELECT ( $1 , $2 , $3 , $4 , $5);";
const _deleteEslabon = "SELECT delete_eslabon( $1 );";

module.exports = {

    getAllEslabon : async function(req, res) {
    const rol = req.params['rol'];
    const id_comercio = req.params['comercio'];      
      try {
        const response = await pool.query(_getAllEslabon,[ rol, id_comercio ]);
        res.status(200).send(response.rows);
      } catch (error) {
        res.status(404).send(error);
      }

    },

    getEslabonByIdSerial : async function(req, res){
      const idserial = req.params['idserial'];
      try {
        const response = await pool.query(_getEslabonByIdSerial, [ idserial ]);
        res.status(200).send(response.rows);
      } catch (error) {
        res.status(404).send(error);
      }

    },

    createEslabon : async function (req, res){

        const { serialId, tipo, descripcion, nombreAlmacen} = req.body
        try{
          const response = await pool.query( _createEslabon , [ serialId,
                                                                 tipo, 
                                                                 descripcion,
                                                                 nombreAlmacen]);                   
          res.status(200).send({'message':'Unidad estatica creada exitosamente'});
        } catch(error){
          res.status(404).send(error);
        }

    },

    // updateCommerce: async function(req, res){
      
    //   const { nombre, descripcion, rif, avenida, calle} = req.body
    //   try {
    //     const response = await pool.query( _updateCommerce, [ nombre,
    //                                                       descripcion,
    //                                                       rif,
    //                                                       avenida, 
    //                                                       calle]);
    //     res.status(200).send(response.rows);
    //   } catch (error) {
    //     res.status(404).send(error);
    //   }
    // },

    deleteEslabon : async function(req, res){

      const { idSerial } = req.body
      try {
        const response = await pool.query(_deleteEslabon, [idSerial]);
        res.status(200).send({'message':'Unidad estatica eliminada exitosamente'});
      } catch (error) {
        res.status(404).send(error);
      }

    }


}