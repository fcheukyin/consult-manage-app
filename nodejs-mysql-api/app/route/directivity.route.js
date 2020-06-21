module.exports = function(app) {
 
    const directivities = require('../controller/directivity.controller.js');
    const auth = require('../controller/auth.controller.js');
 
    app.get('/api/directivities', auth.checkIfAuthenicated, directivities.findAll);
}