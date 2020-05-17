module.exports = function(app) {
 
    const groups = require('../controller/group.controller.js');
    const auth = require('../controller/auth.controller.js');
 
    app.get('/api/groups', auth.checkIfAuthenicated, groups.findAll);
}