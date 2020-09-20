//get_rubro_transport_unit(_placa character varying) 
const Pool = require('pg').Pool

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

const _createRubro = "SELECT create_rubro_by_non_super( $1 , $2 , $3 , $4 , $5);";
const _getAllRubroByRolCompany = "SELECT * FROM get_all_rubro_rol( $1 , $2 ,$3);";
const _getRubroById = "SELECT * FROM rubro where rub_id = $1;";
const _getRubroByNameAndCompany = "SELECT * FROM  get_rubro_by_nombre( $1 , $2)"
const _getAllRubroByCompany = "SELECT * FROM get_all_rubro( $1 );";
const _getRubroByStaticUnit = "SELECT * FROM get_rubro_static_unit( $1 );";
const _getRubroByTransportcUnit = "SELECT * FROM get_rubro_transport_unit( $1 );";
const _updateRubro= "SELECT update_rubro_by_non_super( $1 , $2 , $3 , $4 , $5);";
const _deleteRubro = "SELECT delete_rubro_by_non_super( $1 , $2 );";

module.exports = {
//'Cochino',7
    getRubroById : async function(req, res) {
      const id = req.params['id'];    
        try {
          const response = await pool.query(_getRubroById,[id]);
          res.status(200).send(response.rows);
        } catch (error) {
          res.status(404).send(error);
        }
    },

    getRubroByNameAndCompany : async function(req, res) {
      const nombre_rubro = req.params['nombre'];
      const id_comercio = req.params['id_comercio'];        
        try {
          const response = await pool.query(_getRubroByNameAndCompany,[nombre_rubro, id_comercio]);
          res.status(200).send(response.rows);
        } catch (error) {
          res.status(404).send(error);
        }
    },

    getAllRubroByCompany : async function(req, res) {
      const id_comercio = req.params['comercio'];      
        try {
          const response = await pool.query(_getAllRubroByCompany,[id_comercio]);
          res.status(200).send(response.rows);
        } catch (error) {
          res.status(404).send(error);
        }
    },
  
    getRubroByStaticUnit : async function(req, res){
        const serial_id = req.params['serial'];
        console.log(serial_id + "  Antes del try")
        try {
          console.log(serial_id + "  Drento del try")
          const response = await pool.query(_getRubroByStaticUnit, [serial_id]);
          res.status(200).send(response.rows);
        } catch (error) {
          res.status(404).send(error);
        }
  
      },

        
      getRubroByTransportUnit : async function(req, res){
        const placa = req.params['placa'];
        console.log(placa+ "  Antes del try")
        try {
          console.log(placa+ "  Drento del try")
          const response = await pool.query(_getRubroByTransportcUnit, [placa]);
          res.status(200).send(response.rows);
        } catch (error) {
          res.status(404).send(error);
        }
  
      },

      createRubro : async function (req, res){
  
          const { nombre, tipo, temp_min, temp_max, comercio} = req.body
          try{
            const response = await pool.query( _createRubro , [ nombre, 
                                                                tipo, 
                                                                temp_min, 
                                                                temp_max, 
                                                                comercio
                                                              ]);                   
            res.status(200).send({'message':'Rubro creado exitosamente'});
          } catch(error){
            res.status(404).send(error);
          }
  
      },
  
      updateRubro : async function(req, res){
        
        const { nombre, tipo, temp_min, temp_max, comercio } = req.body
        try {
          const response = await pool.query(_updateRubro, [ nombre, 
                                                            tipo, 
                                                            temp_min, 
                                                            temp_max, 
                                                            comercio
                                                          ]);
          res.status(200).send(response.rows);
        } catch (error) {
          res.status(404).send(error);
        }
      },
  
      deleteRubro : async function(req, res){
  
        const { nombre , comercio } = req.body
        try {
          const response = await pool.query(_deleteRubro, [nombre , comercio]);
          res.status(200).send({'message':'Rubro eliminado exitosamente'});
        } catch (error) {
          res.status(404).send(error);
        }
  
      }


}