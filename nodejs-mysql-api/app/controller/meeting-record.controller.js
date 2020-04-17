const db = require('../config/db.config.js');
const MeetingRecord = db.meeting_records;
 
exports.findAllById = (req, res) => {  
    MeetingRecord.findAll({
        where: {employeeId: req.params.employeeId},
        order: [['meetingDate', 'DESC']],
        include: [{model: db.employees, attributes:[]}],
        attributes:{include:[
            [db.sequelize.col('employee.firstName'),'employeeFirstName'],
            [db.sequelize.col('employee.lastName'),'employeeLastName']
          ]},
        raw: true
    }).then(records => {
        for (let i = 0; i < records.length; i++) {
            records[i].employeeName = records[i].employeeFirstName + records[i].employeeLastName;
        }
        res.json(records);
    });
};