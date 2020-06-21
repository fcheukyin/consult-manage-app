module.exports = function(app) {
 
    const charms = require('../controller/charm.controller.js');
    const auth = require('../controller/auth.controller.js');
 
    app.get('/api/charms', auth.checkIfAuthenicated, charms.findAll);
}