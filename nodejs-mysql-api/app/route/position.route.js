module.exports = function(app) {
 
    const positions = require('../controller/position.controller.js');
    const auth = require('../controller/auth.controller.js');
 
    app.get('/api/positions', auth.checkIfAuthenicated, positions.findAll);
}