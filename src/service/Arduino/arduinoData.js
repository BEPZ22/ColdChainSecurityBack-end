let data = 
        [{
            'ip': "192.168.1.1",
            'long':  10.485043,
            'lat': -66.804953,
            'temp': 33,
            'date': {
                        'date': ""
                    }
            
            
        },];

module.exports = {

    getData : function(req, res){
        res.send(data);
    },

    addData : function( req, res) {
        var ip = req.body.ip;
        var longitud = req.body.long;
        var latitud = req.body.lat;
        var temperatura = req.body.temp;
        var fecha = req.body.date;
        
        data.push({'ip': ip,
                   'long': longitud,
                   'lat': latitud,
                   'temp': temperatura,
                   'date': fecha
                });
        res.send(data);
    }


};