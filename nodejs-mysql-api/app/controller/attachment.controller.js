const db = require('../config/db.config.js');
const Attachment = db.attachments;
 
exports.findAll = (req, res) => {
  Attachment.findAll({order: [['id', 'ASC']],
                attributes:{include:[
                                        [db.sequelize.col('attachment.name'),'name'],
                                    ]},
                raw:true}).then(units => {
    res.json(units);
  });
};