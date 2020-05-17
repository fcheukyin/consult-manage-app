const db = require('../config/db.config.js');
const Employee = db.employees;
const MeetingRecord = db.meeting_records;
const Position = db.positions;
const Unit = db.units;
const Motivation = db.motivations;
const Charm = db.charms;
const Directivity = db.directivities;
const Group = db.groups;
 
exports.create = (req, res) => {  
  let employee = req.body;
  Employee.create(employee).then(result => {    
    res.json(result);
  });
};
 
// Fetch all Customers
exports.findAll = (req, res) => {
  var employeeList;
  var a = 1;
  var meetingRecords;
  Employee.findAll({
                    order: [['id', 'ASC']],
                    include:[
                              {model: MeetingRecord, attributes:[], require: false},
                              {model: Position, attributes:[]},
                              {model: Motivation, attributes:[]},
                              {model: Unit, attributes:[]},
                              {model: Charm, attributes:[]},
                              {model: Directivity, attributes:[]},
                              {model: Group, attributes:[]}
                            ],
                    attributes:{include:[
                                          [db.sequelize.col('position.name'),'positionName'],
                                          [db.sequelize.col('unit.name'),'unitName'],
                                          [db.sequelize.col('motivation.name'),'motivationName'],
                                          [db.sequelize.col('charm.name'),'charmName'],
                                          [db.sequelize.col('directivity.name'),'directivityName'],
                                          [db.sequelize.col('group.name'),'groupName']
                                        ]},
                    raw:true}).then(employees => {
    MeetingRecord.findAll({
      order: [['meetingDate', 'DESC']],
      // include: [{model: db.employees, attributes:[]}],
      // attributes: {include:[ ['meeting_date','lastMeetingDate']]},
      group: [db.sequelize.col('meeting_record.employee_id')],
      attributes: {include:[  
                              [db.sequelize.fn('MAX', db.sequelize.col('meeting_record.meeting_date')), 'lastMeetingDate']
                          ]},
      raw:true
    }).then(records => {
        for (let i = 0; i < Object.keys(employees).length; i++) {
          for (let j = 0; j < Object.keys(records).length; j++) {
            if (employees[i].id == records[j].employeeId) {
              employees[i].lastMeeting = records[j].lastMeetingDate;
            }
          }
        }
        res.json(employees);
    });
  });
};
 
// Find a Customer by Id
exports.findById = (req, res) => {  
  // Employee.findById(req.params.employeeId).then(employee => {
  //   res.json(employee);
  // });
  Employee.findOne({
    where: {id: req.params.employeeId},
    order: [['id', 'ASC']],
    include:[
              {model: MeetingRecord, attributes:[], require: false},
              {model: Position, attributes:[]},
              {model: Motivation, attributes:[]},
              {model: Unit, attributes:[]},
              {model: Charm, attributes:[]},
              {model: Directivity, attributes:[]},
              {model: Group, attributes:[]}
            ],
    attributes:{include:[
                          [db.sequelize.col('position.name'),'positionName'],
                          [db.sequelize.col('unit.name'),'unitName'],
                          [db.sequelize.col('motivation.name'),'motivationName'],
                          [db.sequelize.col('charm.name'),'charmName'],
                          [db.sequelize.col('directivity.name'),'directivityName'],
                          [db.sequelize.col('group.name'),'groupName']
                        ]},
    raw:true}).then(employee => {
      employee.name = employee.firstName + employee.lastName;
      res.json(employee);
  });
};
 
// Update a Customer
exports.update = (req, res) => {
  let employee = req.body;
  let id = req.body.id;
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  Employee.update(employee, 
           { where: {id: id} }
           ).then(() => {
             res.status(200).json({msg:firstname + lastname + "さんの記録が更新されました。"});
           });  
};
 
// Delete a Customer by Id
exports.delete = (req, res) => {
  const id = req.params.customerId;
  Customer.destroy({
    where: { id: id }
  }).then(() => {
    res.status(200).json({msg:'deleted successfully a customer with id = ' + id});
  });
};