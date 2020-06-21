module.exports = function(app) {
 
    const motivations = require('../controller/motivation.controller.js');
    const auth = require('../controller/auth.controller.js');
 
    app.get('/api/motivations', auth.checkIfAuthenicated, motivations.findAll);
}