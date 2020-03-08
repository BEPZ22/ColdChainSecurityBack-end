const arduino = require("./Arduino/arduinoData");
const user = require("./User/userData");
const app = require("../../server");

module.exports = {
    
    assignRoutes : function(){
        
        app.app.get('/arduino', arduino.getData);
        app.app.post('/arduino', arduino.addData);
        app.app.get('/usuario', user.getAllUsers);
        app.app.get('/usuarioID', user.getUserByID);
        app.app.post('/usuario', user.createUser);
        app.app.put('/usuario', user.updateUser);
        app.app.delete('/usuario', user.deleteUser);
    }
}