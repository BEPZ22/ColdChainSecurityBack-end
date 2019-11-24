const data2 = require("./mapaData");

module.exports = {
    
    assignRoutes : function(app){
    
        app.get('/mapa', data2.getData2);
        app.post('/mapa', data2.addData2);

    
    }
}