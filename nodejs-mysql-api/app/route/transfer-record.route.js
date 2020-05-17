module.exports = function(app) {
 
    const transferRecord = require('../controller/transfer-record.controller.js');
    const auth = require('../controller/auth.controller.js');
 
    app.get('/api/transfer_records/:employeeId', auth.checkIfAuthenicated, transferRecord.findAllById);

}