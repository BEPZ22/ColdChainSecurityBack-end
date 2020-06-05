var coldFabric = require('./coldFabric').ColdFabric;

let data = 
        [];

module.exports = {
	// ObjectType 	string `json:"docType"`
	// ID           int   `json:"id"`   		//0
	// Unidad      string `json:"unidad"`		//1
	// Almacen     string `json:"almacen"`		//2
	// Latitud     string `json:"latitud"`		//3
	// Longitud 	string `json:"longitud"`	//4
	// Temperatura string `json:"temperatura"`	//5
	// FechaHora 	string `json:"fecha"`		//6
	// Comercio  	string `json:"comercio"`	//7
	// UnidadAlmacen  	string `json:"unidadAlmacen"`	//9
    getData : function(req, res){
        try {
            res.status(200).send(data);
          } catch (error) {
            res.status(404).send(error);
          }
    },

    addData : function( req, res) {
        const Id = req.params['Id'] //id
        const Lg = req.params['Lg'] //longitud
        const Lt = req.params['Lt'] //latitud
        const Tp = req.params['Tp'] //temperatura
        const Dt = req.params['Dt'] //fecha hora
        const Un = req.params['Un'] //unidadTransporte
        const Wh = req.params['Wh'] //almacen
        const Co = req.params['Co'] //comercio
        const Ua = req.params['Ua'] //unidadAlmacen

        try {
            data.push({
                'Id' : Id,
                'Lg': Lg,
                'Lt': Lt,
                'Tp': Tp,
                'Dt': Dt,
                'Un': Un,
                'Wh': Wh,
                'Co': Co,
                'Ua': Ua
                });
            res.status(200).send('Informacion introducida de manera correcta')
        } catch (error) {
            res.status(404).send(error);
        }

    },
    // ?Id=1&Lg=10&Lt=10&Tp=10&Dt=5/9/2020 3:55&Un=XLRT2EWR&Wh=ColdChainSecurity4&Co=Farmatodo&Ua=123w2343
    addData2 : function( req, res) {
        const Id = req.query.Id
        const Lg = req.query.Lg
        const Lt = req.query.Lt
        const Tp = req.query.Tp
        const Dt = req.query.Dt
        const Un = req.query.Un
        const Wh = req.query.Wh
        const Co = req.query.Co
        const Ua = req.query.Ua

        try {
            data.push({
                'Id' : Id,
                'Lg': Lg,
                'Lt': Lt,
                'Tp': Tp,
                'Dt': Dt,
                'Un': Un,
                'Wh': Wh,
                'Co': Co,
                'Ua': Ua
                });
            res.status(200).send('Informacion introducida de manera correcta')
        } catch (error) {
            res.status(404).send(error);
        }
    },

    getAllHLF : function(req, res){
        coldFabric.init().then(function(){
            return coldFabric.queryAllArduinoData()
        }).then(function(data){
            res.status(200).json(data)
        }).catch(function(err){
            res.status(500).json({error: err.toString()})
        })
    }


};