let data = 
        [];

module.exports = {

    getData : function(req, res){
        try {
            res.status(200).send(data);
          } catch (error) {
            res.status(404).send(error);
          }
    },

    addData : function( req, res) {
        const Lg = req.query.Lg
        const Lt = req.query.Lt
        const Tp = req.query.Tp
        const Dt = req.query.Dt
        const Un = req.query.Un
        const Wh = req.query.Wh
        // const { Lg, Lt, Tp, Dt, Un, Wh } = req.query
        try {
            data.push({
                'Lg': Lg,
                'Lt': Lt,
                'Tp': Tp,
                'Dt': Dt,
                'Un': Un,
                'Wh': Wh
                });
            res.status(200).send('Informacion introducida de manera correcta')
        } catch (error) {
            res.status(404).send(error);
        }

    }


};