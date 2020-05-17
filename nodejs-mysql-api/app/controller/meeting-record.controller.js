const db = require('../config/db.config.js');
const MeetingRecord = db.meeting_records;
 
exports.findAllById = (req, res) => {  
    MeetingRecord.findAll({
        where: {employeeId: req.params.employeeId},
        order: [['meetingDate', 'DESC']],
        include: [
            {model: db.employees, attributes:[]},
            {model: db.reviewers, attributes:[]}
        ],
        attributes:{include:[
            [db.sequelize.col('employee.firstName'),'employeeFirstName'],
            [db.sequelize.col('employee.lastName'),'employeeLastName'],
            [db.sequelize.col('reviewer.firstName'),'reviewerFirstName'],
            [db.sequelize.col('reviewer.lastName'),'reviewerLastName']
          ]},
        raw: true
    }).then(records => {
        for (let i = 0; i < records.length; i++) {
            records[i].employeeName = records[i].employeeFirstName + records[i].employeeLastName;
            records[i].reviewerName = records[i].reviewerFirstName + records[i].reviewerLastName;
        }
        res.json(records);
    });
};

exports.create = (req, res) => {
    let record = req.body.record;
    MeetingRecord.create(record).then(result => 
        res.json(result.id)
    )
}