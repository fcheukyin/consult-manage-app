const db = require('../config/db.config.js');
const { Op } = require("sequelize");
const POSITION = require("../config/position");
const Employee = db.employees;
const MeetingRecord = db.meeting_records;
const Position = db.positions;
const Attachment = db.attachments;
const Motivation = db.motivations;
const Charm = db.charms;
const Directivity = db.directivities;
const Group = db.groups;
const Reviewer = db.reviewers;
const Prefecture = db.prefectures;
 
exports.create = (req, res) => {  
  let employees = req.body.employees;
  
  var await = employees.map(o => Employee.create(o));
  Promise.all(await)
  .then(() => res.json("success"))
  .catch(e => res.json(e));
};

exports.findAll = (req, res) => {
  Employee.findAll({
    where: {deletedAt: {[Op.or]: [null, {[Op.gt]:new Date()}]}},
    order: [['id', 'ASC']],
    include:[
              {model: MeetingRecord, attributes:[], require: false},
              {model: Position, attributes:[]},
              {model: Motivation, attributes:[]},
              {model: Attachment, attributes:[]},
              {model: Charm, attributes:[]},
              {model: Directivity, attributes:[]},
              {model: Group, attributes:[]},
              {model: Prefecture, attributes:[]}
            ],
    attributes:{include:[
                          [db.sequelize.col('position.name'),'positionName'],
                          [db.sequelize.col('attachment.name'),'unitName'],
                          [db.sequelize.col('motivation.name'),'motivationName'],
                          [db.sequelize.col('charm.name'),'charmName'],
                          [db.sequelize.col('directivity.name'),'directivityName'],
                          [db.sequelize.col('group.name'),'groupName'],
                          [db.sequelize.col('prefecture.name'),'prefectureName']
                        ]},
    raw:true}).then(result => res.json(result))
}
 
// Fetch all Customers
exports.findForUser = (req, res) => {
    Reviewer.findOne({
      where: {
        id: req.params.loginId,
        deletedAt: {[Op.or]: [null, {[Op.gt]:new Date()}]}
      },
      raw: true
    }).then(reviewer => {
      var whereCondition = {deletedAt: {[Op.or]: [null, {[Op.gt]:new Date()}]}}
      if (reviewer.positionId == POSITION.UD) {
        whereCondition = {unitId: reviewer.unitId, deletedAt: {[Op.or]: [null, {[Op.gt]:new Date()}]}}
      }
      if (reviewer.positionId == POSITION.GD) {
        whereCondition = {groupId: reviewer.groupId, deletedAt: {[Op.or]: [null, {[Op.gt]:new Date()}]}}
      }
      Employee.findAll({
        where: whereCondition,
        order: [['id', 'ASC']],
        include:[
                  {model: MeetingRecord, attributes:[], require: false},
                  {model: Position, attributes:[]},
                  {model: Motivation, attributes:[]},
                  {model: Attachment, attributes:[]},
                  {model: Charm, attributes:[]},
                  {model: Directivity, attributes:[]},
                  {model: Group, attributes:[]},
                  {model: Prefecture, attributes:[]}
                ],
        attributes:{include:[
                              [db.sequelize.col('position.name'),'positionName'],
                              [db.sequelize.col('attachment.name'),'unitName'],
                              [db.sequelize.col('motivation.name'),'motivationName'],
                              [db.sequelize.col('charm.name'),'charmName'],
                              [db.sequelize.col('directivity.name'),'directivityName'],
                              [db.sequelize.col('group.name'),'groupName'],
                              [db.sequelize.col('prefecture.name'),'prefectureName']
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
    })
};
 
exports.findById = (req, res) => {  
  Employee.findOne({
    where: {id: req.params.employeeId, deletedAt: {[Op.or]: [null, {[Op.gt]:new Date()}]}},
    order: [['id', 'ASC']],
    include:[
              {model: MeetingRecord, attributes:[], require: false},
              {model: Position, attributes:[]},
              {model: Motivation, attributes:[]},
              {model: Attachment, attributes:[]},
              {model: Charm, attributes:[]},
              {model: Directivity, attributes:[]},
              {model: Group, attributes:[]},
              {model: Prefecture, attributes:[]}
            ],
    attributes:{include:[
                          [db.sequelize.col('position.name'),'positionName'],
                          [db.sequelize.col('attachment.name'),'unitName'],
                          [db.sequelize.col('motivation.name'),'motivationName'],
                          [db.sequelize.col('charm.name'),'charmName'],
                          [db.sequelize.col('directivity.name'),'directivityName'],
                          [db.sequelize.col('group.name'),'groupName'],
                          [db.sequelize.col('prefecture.name'),'prefectureName']
                        ]},
    raw:true}).then(employee => {
      if (employee) {
        employee.name = employee.firstName + employee.lastName;
        res.json(employee);
      } else {
        res.json(null);
      }
  });
};
 
exports.update = (req, res) => {
  let employee = req.body.employee;
  Employee.update(employee, {
    where: {id: employee.id}
  }).then(result => {
    res.json(result);
  }).catch(err => {
    res.status(403).json(err);
  })
}

exports.delete = (req, res) => {
  let employee = req.body.employee;
  Employee.update(employee, {
    where: {id: employee.id}
  }).then(result => {
    res.json(result);
  }).catch(err => {
    res.status(403).json(err);
  })
}