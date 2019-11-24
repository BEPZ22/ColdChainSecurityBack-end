
const data2 = require("./mapaData");

module.exports = {
    
    assignRoutes : function(app){
    
        app.get('/mapa', data2.getData);
        app.post('/mapa', data2.addData);

    
    }
}