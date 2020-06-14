var ColdFabric = require('./coldFabric');

let data = [];



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
   
    addDataHLF : function( req, res) {
        let coldFabric = new ColdFabric();
        var arduino = {
            id : req.body.id ,
            lg : req.body.lg,
            lt : req.body.lt,
            tp : req.body.tp, 
            dt : req.body.dt,
            un : req.body.un,
            wh : req.body.wh,
            co : req.body.co,
            ua : req.body.ua
        }
        coldFabric.init().then(function() {
            return coldFabric.addArduinoData(arduino)
          }).then(function (data) {
            res.status(200).json(data)
          }).catch(function(err) {
            res.status(500).json({error: err.toString()})
          })
        // try {
        //     data = await coldFabric.addArduinoData(arduino);
        //     res.status(200).send({"message":"Informacion almacenada de manera exitosa"});
        // } catch (error) {
        //     res.status(500).send({error: "Error desde Heroku " + error.toString()});
        // }
    },

    getAllHLF :  function(req, res){
        let coldFabric = new ColdFabric();
        coldFabric.init().then(function() {
            return coldFabric.queryAllArduinoData()
          }).then(function (data) {
            res.status(200).json(data)
          }).catch(function(err) {
            res.status(500).json({error: err.toString()})
          })

    }, 

};