module.exports = function(app) {
 
    const attachments = require('../controller/attachment.controller.js');
    const auth = require('../controller/auth.controller.js');
 
    app.get('/api/units', auth.checkIfAuthenicated, attachments.findAll);
}