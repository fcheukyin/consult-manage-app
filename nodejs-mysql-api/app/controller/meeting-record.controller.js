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
            [db.sequelize.col('employee.first_name'),'employeeFirstName'],
            [db.sequelize.col('employee.last_name'),'employeeLastName'],
            [db.sequelize.col('reviewer.first_name'),'reviewerFirstName'],
            [db.sequelize.col('reviewer.last_name'),'reviewerLastName']
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

exports.findRecent = (req, res) => {  
    MeetingRecord.findAll({
        limit: 10, 
        where: {reviewerId: req.params.loginId},
        order: [['meetingDate', 'DESC']],
        include: [
            {model: db.employees, attributes:[]},
            {model: db.reviewers, attributes:[]}
        ],
        attributes:{include:[
            [db.sequelize.col('employee.first_name'),'employeeFirstName'],
            [db.sequelize.col('employee.last_name'),'employeeLastName'],
            [db.sequelize.col('reviewer.first_name'),'reviewerFirstName'],
            [db.sequelize.col('reviewer.last_name'),'reviewerLastName']
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

exports.update = (req, res) => {
    let record = req.body.record;
    MeetingRecord.update(record, {
        where: {
            id: record.id
        }
    }).then(result => 
        res.json(result.id)
    )
}

exports.delete = (req, res) => {
    MeetingRecord.destroy({
        where: {id: req.params.id}
    }).then(() => {
        res.json("deleted")
    })
}