let data = 
        [
            {"lat" : 10.485043, "lng": -66.804953},
        ];

module.exports = {

    getData : function(req, res){
        res.send(data);
    },

    addData : function( req, res) {
        var latitud = req.body.lat;
        var longitud = req.body.lng;
        console.log(req.body.lat, req.body.lng);
        data.push({'lat': latitud,'lng': longitud});
        res.send(data);
    }


};