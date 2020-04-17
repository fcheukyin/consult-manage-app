module.exports = function(app) {
 
    const units = require('../controller/unit.controller.js');
 
    app.get('/api/units', units.findAll);
}