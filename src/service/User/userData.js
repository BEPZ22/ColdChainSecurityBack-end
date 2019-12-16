let data = 
        [
            {'name': 'Copo',
            'lastname': 'Hevia',
            'id': 1,
            'position': 'CEO',
            'user': 'CopitoElLoquito',
            'password': 12345678},
        ];

module.exports = {

    getData : function(req, res){
        res.send(data);
    },

    addData : function( req, res) {
        var nombre = req.body.name;
        var apellido = req.body.lastname;
        var cedula = req.body.id;
        var cargo = req.body.position;
        var usuario = req.body.user;
        var contrasena = req.body.password;

        data.push({'name': nombre,
                   'lastname': apellido,
                   'id': cedula,
                   'position': cargo,
                   'user': usuario,
                   'password': contrasena
                });
        res.send(data);
    }


};