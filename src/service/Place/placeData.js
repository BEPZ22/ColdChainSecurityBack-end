const Pool = require('pg').Pool

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

const _getAllCountries = "SELECT lugar_nombre FROM lugar WHERE lugar_tipo = 'Pais';";
const _getAllStates = "select * from get_states_by_country($1);";

module.exports = {

    getAllCountries : async function(req, res) {
        try {
          const response = await pool.query(_getAllCountries);
          res.status(200).send(response.rows);
        } catch (error) {
          res.status(404).send(error);
        }
      },

    getAllStatesByCountries : async function(req, res) {
        const { pais } = req.body
        try {
          const response = await pool.query(_getAllStates, [pais]);
          res.status(200).send(response.rows);
        } catch (error) {
          res.status(404).send(error);
        }
      }

}