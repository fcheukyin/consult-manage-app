module.exports = function(app) {
 
    const meetingRecord = require('../controller/meeting-record.controller.js');
    const auth = require('../controller/auth.controller.js');
 
    app.get('/api/meeting_records/:employeeId', auth.checkIfAuthenicated, meetingRecord.findAllById);

    app.post('/api/meeting_records/create', auth.checkIfAuthenicated, meetingRecord.create);

}