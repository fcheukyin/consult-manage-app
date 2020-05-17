module.exports = function(app) {
 
    const units = require('../controller/unit.controller.js');
    const auth = require('../controller/auth.controller.js');
 
    app.get('/api/units', auth.checkIfAuthenicated, units.findAll);
}