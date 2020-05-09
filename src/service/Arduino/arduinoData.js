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
        const Lg = req.params['Lg']
        const Lt = req.params['Lt']
        const Tp = req.params['Tp']
        const Dt = req.params['Dt']
        const Un = req.params['Un']
        const Wh = req.params['Wh']
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