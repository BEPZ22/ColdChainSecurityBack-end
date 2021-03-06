const Pool = require('pg').Pool

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

const _createTruck = "SELECT create_truck( $1 , $2 , $3 , $4 , $5 , $6, $7, $8 , $9 );";
const _getTruckByPlate = "SELECT * FROM get_unidad_informacion_by_placa( $1 );";
const _getAllTrucks = "SELECT * FROM get_unidad_informacion($1 , $2);";
const _getTruckByCommerce = "SELECT * FROM get_unidad_by_comercio( $1 );";
const _updateTruck = "SELECT update_truck( $1 , $2 , $3 , $4 , $5 , $6, $7, $8 , $9);";
const _deleteTruck = "SELECT delete_truck( $1 );";

module.exports = {

    getAllTrucks : async function(req, res) {
      const rol = req.params['rol'];
      const id_comercio = req.params['comercio'];      
        try {
          const response = await pool.query(_getAllTrucks,[rol,id_comercio]);
          res.status(200).send(response.rows);
        } catch (error) {
          res.status(404).send(error);
        }
  
      },
  
      getTruckByPlate : async function(req, res){
        const placa = req.params['placa'];
        try {
          const response = await pool.query(_getTruckByPlate, [placa]);
          res.status(200).send(response.rows);
        } catch (error) {
          res.status(404).send(error);
        }
  
      },
      
      getTruckByCommerce : async function(req, res){
        const commerce = req.params['comercio'];
        try {
          const response = await pool.query(_getTruckByCommerce, [commerce]);
          res.status(200).send(response.rows);
        } catch (error) {
          res.status(404).send(error);
        }
  
      },

      createTruck : async function (req, res){
  
          const { conductor, marca, modelo, placa, ano, capacidad, ruta, nombreComercio ,rubro} = req.body
          try{
            const response = await pool.query( _createTruck , [ conductor, 
                                                               marca, 
                                                               modelo, 
                                                               placa, 
                                                               ano, 
                                                               capacidad,
                                                               ruta,
                                                               nombreComercio,
                                                               rubro
                                                              ]);                   
            res.status(200).send({'message':'Unidad creada exitosamente'});
          } catch(error){
            res.status(404).send(error);
          }
  
      },
  
      updateTruck : async function(req, res){
        
        const { conductor, marca, modelo, placa, ano, capacidad,ruta, placaNueva, rubro} = req.body
        try {
          const response = await pool.query(_updateTruck, [ conductor, 
                                                            marca, 
                                                            modelo, 
                                                            placa, 
                                                            ano, 
                                                            capacidad,
                                                            ruta,
                                                            placaNueva,
                                                            rubro
                                                          ]);
          res.status(200).send(response.rows);
        } catch (error) {
          res.status(404).send(error);
        }
      },
  
      deleteTruck : async function(req, res){
  
        const { placa } = req.body
        try {
          const response = await pool.query(_deleteTruck, [placa]);
          res.status(200).send({'message':'Unidad eliminada exitosamente'});
        } catch (error) {
          res.status(404).send(error);
        }
  
      }


}