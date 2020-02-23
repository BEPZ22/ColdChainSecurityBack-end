const arduino = require("./Arduino/arduinoData");
const user = require("./User/userData");

module.exports = {
    
    assignRoutes : function(app){
        
        app.get('/arduino', arduino.getData);
        app.post('/arduino', arduino.addData);
        app.get('/prueba', user.getUsers_);
        app.get('/usuario', user.getUsers_);
        app.post('/usuario', user.createUser);
        app.get('/usuarioID', user.getUserById_);
  
    }
}