const arduino = require("./Arduino/arduinoData");
const user = require("./User/userData");
const truck = require("./Truck/truckData");

module.exports = {
    
    assignRoutes : function(app){
        
        app.get('/arduino', arduino.getData);
        app.post('/arduino', arduino.addData);

        app.get('/usuario', user.getAllUsers);
        app.get('/usuarioID', user.getUserByID);
        app.post('/usuario', user.createUser);
        app.put('/usuario', user.updateUser);
        app.delete('/usuario', user.deleteUser);

        app.get('/unidad', truck.getAllTrucks);
        app.get('/unidadPlaca', truck.getTruckByPlate);
        app.post('/unidad', truck.createTruck);
        app.put('/unidad', truck.updateTruck);
        app.delete('/unidad', truck.deleteTruck);

    }
}