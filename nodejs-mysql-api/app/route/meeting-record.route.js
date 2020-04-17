module.exports = function(app) {
 
    const meetingRecord = require('../controller/meeting-record.controller.js');
 
    app.get('/api/meeting_records/:employeeId', meetingRecord.findAllById);

}