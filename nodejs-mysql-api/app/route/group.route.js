module.exports = function(app) {
 
    const groups = require('../controller/group.controller.js');
 
    app.get('/api/groups', groups.findAll);
}