const Pool = require('pg').Pool

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

const _createWarehouse = "SELECT create_warehouse( $1 , $2 , $3 , $4 , $5 , $6, $7, $8 , $9, $10 );";
const _getWarehouseByWarehouse = "SELECT * FROM get_almacen_informacion_by_almacen( $1 );";
const _getAllWarehouse = "SELECT * FROM get_almacen_informacion();";
const _updateWarehouse = "SELECT update_warehouse( $1 , $2 , $3 , $4 , $5 , $6, $7, $8 , $9, $10, $11);";
const _deleteWarehouse = "SELECT delete_warehouse( $1 );";
const _getWareHouseName = "SELECT almacen_nombre from almacen"

module.exports = {

    getAllWarehouse : async function(req, res) {
        try {
          const response = await pool.query(_getAllWarehouse);
          res.status(200).send(response.rows);
        } catch (error) {
          res.status(404).send(error);
        }
  
      },
  
      getWarehouseByWarehouseName : async function(req, res){
        const nombre=  req.params['nombre']
        try {
          const response = await pool.query(_getWarehouseByWarehouse, [nombre]);
          res.status(200).send(response.rows);
        } catch (error) {
          res.status(404).send(error);
        }
  
      },

      getWarehouseName : async function(req, res){
        try {
          const response = await pool.query(_getWareHouseName);
          res.status(200).send(response.rows);
        } catch (error) {
          res.status(404).send(error);
        }
  
      },
  
      createWarehouse : async function (req, res){
  
          const { nombre, avenida, calle, zona, edificio, apartamento, nro_apartameto, casa, nro_casa, lugar } = req.body
          try{
            const response = await pool.query( _createWarehouse , [ nombre, 
                                                                avenida, 
                                                                calle, 
                                                                zona, 
                                                                edificio, 
                                                                apartamento, 
                                                                nro_apartameto, 
                                                                casa, 
                                                                nro_casa, 
                                                                lugar]);                   
            res.status(200).send({'message':'Almacen creado exitosamente'});
          } catch(error){
            res.status(404).send(error);
          }
  
      },
  
      updateWarehouse : async function(req, res){
        
        const { nombre, avenida, calle, zona, edificio, apartamento, nro_apartameto, casa, nro_casa, lugar, nombreNuevo } = req.body
        try {
          const response = await pool.query( _updateWarehouse, [ nombre, 
                                                            avenida, 
                                                            calle, 
                                                            zona, 
                                                            edificio, 
                                                            apartamento, 
                                                            nro_apartameto, 
                                                            casa, 
                                                            nro_casa, 
                                                            lugar,
                                                            nombreNuevo]);
          res.status(200).send(response.rows);
        } catch (error) {
          res.status(404).send(error);
        }
      },
  
      deleteWarehouse : async function(req, res){
  
        const { almacen } = req.body
        try {
          const response = await pool.query( _deleteWarehouse, [almacen]);
          res.status(200).send({'message':'Almacen eliminado exitosamente'});
        } catch (error) {
          res.status(404).send(error);
        }
  
      }


}