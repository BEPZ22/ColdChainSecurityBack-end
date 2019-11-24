const data = require("./arduinoData");
const data2 = require("../Mapa/mapaData");

module.exports = {
    
    assignRoutes : function(app){
        
        app.get('/data', data.getData);
        app.post('/data', data.addData);
        app.get('/mapa', data2.getData);
        app.post('/mapa', data2.addData);

    
    }
}