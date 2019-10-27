const data = require("./dataManagement");
//const app = require("./server");

module.exports = {
    
    assignRoutes : function(app){
        
        app.get('/data', data.getData);
        app.post('/data', data.addData);
    
    }
}