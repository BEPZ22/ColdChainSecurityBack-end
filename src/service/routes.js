const arduino = require("./Arduino/arduinoData");
const user = require("./User/userData");

module.exports = {
    
    assignRoutes : function(app){
        
        app.get('/arduino', arduino.getData);
        app.post('/arduino', arduino.addData);
        app.get('/usuario', user.getData);
        app.post('/usuario', user.createUser);
  
    }
}