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
  let reviewers = req.body.reviewers;
  var await = reviewers.map(o => Reviewer.create(o));
  Promise.all(await)
  .then(() => res.json("success"))
  .catch(e => res.json(e));
};

exports.findAll = (req, res) => {
  Reviewer.findAll({
    where: {deletedAt: {[Op.or]: [null, {[Op.gt]:new Date()}]}},
    order: [['id', 'ASC']],
    include:[
              {model: Position, attributes:[]},
              {model: Attachment, attributes:[]},
              {model: Group, attributes:[]},
            ],
    attributes:{include:[
                          [db.sequelize.col('position.name'),'positionName'],
                          [db.sequelize.col('attachment.name'),'unitName'],
                          [db.sequelize.col('group.name'),'groupName'],
                        ]},
    raw:true
  }).then(result => res.json(result))
}

exports.findById = (req, res) => {  
  Reviewer.findOne({
    where: {id: req.params.reviewerId, deletedAt: {[Op.or]: [null, {[Op.gt]:new Date()}]}},
    order: [['id', 'ASC']],
    include:[
              {model: Position, attributes:[]},
              {model: Attachment, attributes:[]},
              {model: Group, attributes:[]},
            ],
    attributes:{include:[
                          [db.sequelize.col('position.name'),'positionName'],
                          [db.sequelize.col('attachment.name'),'unitName'],
                          [db.sequelize.col('group.name'),'groupName'],
                        ]},
    raw:true}).then(reviewer => {
      if (reviewer) {
        reviewer.name = reviewer.firstName + reviewer.lastName;
        res.json(reviewer);
      } else {
        res.json(null);
      }
  });
};

exports.update = (req, res) => {
  let reviewer = req.body.reviewer;
  Reviewer.update(reviewer, {
    where: {id: reviewer.id}
  }).then(result => {
    res.json(result);
  }).catch(err => {
    res.status(403).json(err);
  })
}

exports.delete = (req, res) => {
  let reviewer = req.body.reviewer;
  Reviewer.update(reviewer, {
    where: {id: reviewer.id}
  }).then(result => {
    res.json(result);
  }).catch(err => {
    res.status(403).json(err);
  })
}