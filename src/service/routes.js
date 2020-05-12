const arduino = require("./Arduino/arduinoData");
const user = require("./User/userData");
const truck = require("./Truck/truckData");
const warehouse = require("./Warehouse/warehouseData");
const place = require("./Place/placeData");
const login = require("./Login/Controller/login");
const commerce = require("./Commerce/commerceData");
const otro = require("./Otros/otros");
const auth = require("../service/Login/Middleware/authentification")

module.exports = {
    
    assignRoutes : function(app){
        
        //Arduino
        app.get('/arduino', arduino.getData);
        app.get('/arduino/addData/:Id/:Lg/:Lt/:Tp/:Dt/:Un/:Wh/:Co/:Ua', arduino.addData);
        app.get('/arduino/addData2', arduino.addData2);
        
        //Comercio
        app.get('/comercio/:rol/:comercio', auth.verifyToken, commerce.getAllCommerce);
        app.get('/comercio/id/:id', auth.verifyToken, commerce.getCommerceById);
        // app.get('/comercio/nombre/:name', auth.verifyToken, commerce.getCommerceByName);
        app.get('/comercio/identificacion/:rif', auth.verifyToken, commerce.getCommerceByRif);
        app.get('/comercios', auth.verifyToken, commerce.getCommerceNames);
        app.post('/comercio', auth.verifyToken, commerce.createCommerce);
        app.put('/comercio', auth.verifyToken, commerce.updateCommerce);
        // app.delete('/comercio', auth.verifyToken, );

        //Usuario
        app.get('/usuario/:rol/:comercio', auth.verifyToken, user.getAllUsers);
        app.get('/usuario/cedula/:id/:rol', auth.verifyToken, user.getUserByID);
        app.post('/usuario', auth.verifyToken, user.createUser);
        app.put('/usuario', auth.verifyToken, user.updateUser);
        app.delete('/usuario', auth.verifyToken, user.deleteUser);

        //Unidad / Transporte Eslabon
        app.get('/unidad/:rol/:comercio', auth.verifyToken, truck.getAllTrucks);
        app.get('/unidad/:placa', auth.verifyToken, truck.getTruckByPlate);
        app.post('/unidad', auth.verifyToken, truck.createTruck);
        app.put('/unidad', auth.verifyToken, truck.updateTruck);
        app.delete('/unidad', auth.verifyToken, truck.deleteTruck);

        //Almacen
        app.get('/almacen/:rol/:comercio', auth.verifyToken, warehouse.getAllWarehouse);
        app.get('/almacen/:nombre', auth.verifyToken, warehouse.getWarehouseByWarehouseName);
        app.get('/almacenes', auth.verifyToken, warehouse.getWarehouseName);
        app.post('/almacen', auth.verifyToken, warehouse.createWarehouse);
        app.put('/almacen', auth.verifyToken, warehouse.updateWarehouse); 
        app.delete('/almacen', auth.verifyToken, warehouse.deleteWarehouse);
        
        //Lugar
        app.get('/pais', auth.verifyToken, place.getAllCountries);
        app.get('/estado/:pais', auth.verifyToken, place.getAllStatesByCountries);

        //Roles y Horarios
        app.get('/rol/:rol', auth.verifyToken, otro.getAllRol);
        app.get('/horarioE', auth.verifyToken, otro.getAllEmployeeSchedule);
        app.get('/horarioC', auth.verifyToken, otro.getAllCommerceSchedule);

        //Login
        app.post('/login', login.login);
    }
}