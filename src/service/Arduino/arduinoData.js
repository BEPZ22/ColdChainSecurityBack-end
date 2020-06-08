var ColdFabric = require('./coldFabric');

let data = [];
let coldFabric = new ColdFabric();


module.exports = {

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
        
        var arduino = {
            id : req.query.Id ,
            lg : req.query.Lg,
            lt : req.query.Lt,
            tp : req.query.Tp, 
            dt : req.query.Dt,
            un : req.query.Un,
            wh : req.query.Wh,
            co : req.query.Co,
            ua : req.query.Ua
        }
 
        try {
            data = coldFabric.addArduinoData(arduino);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({error: error.toString()});
        }
    },

    getAllHLF : function(req, res){
        
        try {
            data = coldFabric.queryAllArduinoData();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({error: error.toString()});
        }
    },

};