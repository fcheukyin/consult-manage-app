module.exports = function(app) {
 
    const meetingRecord = require('../controller/meeting-record.controller.js');
    const auth = require('../controller/auth.controller.js');
 
    app.get('/api/meeting_records/:employeeId', auth.checkIfAuthenicated, meetingRecord.findAllById);

    app.get('/api/meeting_records/recent/:loginId', auth.checkIfAuthenicated, meetingRecord.findRecent);

    app.post('/api/meeting_records/create', auth.checkIfAuthenicated, meetingRecord.create);

    app.post('/api/meeting_records/update', auth.checkIfAuthenicated, meetingRecord.update);

    app.get('/api/meeting_records/delete/:id', auth.checkIfAuthenicated, meetingRecord.delete)

}