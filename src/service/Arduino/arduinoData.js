let data = 
        [
            {"name" : "Yo", "lastname": "jeje"},
        ];

module.exports = {

    getData : function(req, res){
        res.send(data);
    },

    addData : function( req, res) {
        var nombre = req.body.name;
        var apellido = req.body.lastname;
        console.log(req.body.name, req.body.lastname);
        data.push({'name': nombre,'lastname': apellido});
        res.send(data);
    }


};