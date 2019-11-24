const data = require("./arduinoData");

module.exports = {
    
    assignRoutes : function(app){
        
        app.get('/data', data.getData);
        app.post('/data', data.addData);
  
    }
}