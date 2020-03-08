const arduino = require("./Arduino/arduinoData");
const user = require("./User/userData");
const app = require("../../server");

module.exports = {
    
    assignRoutes : function(){
        
        app.get('/arduino', arduino.getData);
        app.post('/arduino', arduino.addData);
        app.get('/usuario', user.getAllUsers);
        app.get('/usuarioID', user.getUserByID);
        app.post('/usuario', user.createUser);
        app.put('/usuario', user.updateUser);
        app.delete('/usuario', user.deleteUser);
    }
}