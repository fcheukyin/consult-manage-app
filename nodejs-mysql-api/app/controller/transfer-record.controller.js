const db = require('../config/db.config.js');
const TransferRecord = db.transfer_records;
 
exports.findAllById = (req, res) => {  
    TransferRecord.findAll({
        where: {employeeId: req.params.employeeId},
        order: [['transferDate', 'DESC']],
        include: [
            {model: db.reviewers, attributes:[], as: 'oldReviewer'},
            {model: db.reviewers, attributes:[], as: 'newReviewer'},
            {model: db.groups, attributes:[], as: 'oldGroup'},
            {model: db.groups, attributes:[], as: 'newGroup'},
            {model: db.attachments, attributes: [], as: 'oldUnit'},
            {model: db.attachments, attributes: [], as: 'newUnit'}
        ],
        attributes:{include:[
            [db.sequelize.col('oldReviewer.first_name'),'oldReviewerFirstName'],
            [db.sequelize.col('oldReviewer.last_name'),'oldReviewerLastName'],
            [db.sequelize.col('newReviewer.first_name'),'newReviewerFirstName'],
            [db.sequelize.col('newReviewer.last_name'),'newReviewerLastName'],
            [db.sequelize.col('oldGroup.name'),'oldGroupName'],
            [db.sequelize.col('newGroup.name'),'newGroupName'],
            [db.sequelize.col('oldUnit.name'),'oldUnitName'],
            [db.sequelize.col('newUnit.name'),'newUnitName']
          ]},
        raw: true
    }).then(records => {
        for (let i = 0; i < records.length; i++) {
            records[i].oldReviewerName = records[i].oldReviewerFirstName + records[i].oldReviewerLastName;
            records[i].newReviewerName = records[i].newReviewerFirstName + records[i].newReviewerLastName;
        }
        res.json(records);
    });
};