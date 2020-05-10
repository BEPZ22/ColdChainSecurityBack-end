const arduino = require("./Arduino/arduinoData");
const user = require("./User/userData");
const truck = require("./Truck/truckData");
const warehouse = require("./Warehouse/warehouseData");
const place = require("./Place/placeData");
const login = require("./Login/Controller/login");
const auth = require("../service/Login/Middleware/authentification")

module.exports = {
    
    assignRoutes : function(app){
        
        app.get('/arduino', arduino.getData);
        app.get('/arduino/addData/:Id/:Lg/:Lt/:Tp/:Dt/:Un/:Wh/:Co/:Ua', arduino.addData);
        app.get('/arduino/addData2', arduino.addData2)
        
        app.get('/usuario', auth.verifyToken, user.getAllUsers);
        app.get('/usuario/:id', auth.verifyToken, user.getUserByID);
        app.post('/usuario', auth.verifyToken, user.createUser);
        app.put('/usuario', auth.verifyToken, user.updateUser);
        app.delete('/usuario', auth.verifyToken, user.deleteUser);

        app.get('/unidad', auth.verifyToken, truck.getAllTrucks);
        app.get('/unidad/:placa', auth.verifyToken, truck.getTruckByPlate);
        app.post('/unidad', auth.verifyToken, truck.createTruck);
        app.put('/unidad', auth.verifyToken, truck.updateTruck);
        app.delete('/unidad', auth.verifyToken, truck.deleteTruck);

        app.get('/almacen', auth.verifyToken, warehouse.getAllWarehouse);
        app.get('/almacen/:nombre', auth.verifyToken, warehouse.getWarehouseByWarehouseName);
        app.get('/almacenes', auth.verifyToken, warehouse.getWarehouseName);
        app.post('/almacen', auth.verifyToken, warehouse.createWarehouse);
        app.put('/almacen', auth.verifyToken, warehouse.updateWarehouse); //funcionamiento dudoso
        app.delete('/almacen', auth.verifyToken, warehouse.deleteWarehouse);
        
        app.get('/pais', auth.verifyToken, place.getAllCountries);
        app.get('/estado/:pais', auth.verifyToken, place.getAllStatesByCountries);

        app.post('/login', login.login);
    }
}