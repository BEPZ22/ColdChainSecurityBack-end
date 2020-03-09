const arduino = require("./Arduino/arduinoData");
const user = require("./User/userData");
const truck = require("./Truck/truckData");
const warehouse = require("./Warehouse/warehouseData");
const place = require("./Place/placeData");

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

        app.get('/almacen', warehouse.getAllWarehouse);
        app.get('/almacenNombre', warehouse.getWarehouseByWarehouseName);
        app.get('/almacenes', warehouse.getWarehouseName);
        app.post('/almacen', warehouse.createWarehouse);
        app.put('/almacen', warehouse.updateWarehouse); //funcionamiento dudoso
        app.delete('/almacen', warehouse.deleteWarehouse);
        

        app.get('/pais', place.getAllCountries);
        app.get('/estado', place.getAllStatesByCountries);

    }
}