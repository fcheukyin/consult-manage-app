const db = require('../config/db.config.js');
const Group = db.groups;
 
exports.findAll = (req, res) => {
  Group.findAll({order: [['id', 'ASC']],
                attributes:{include:[
                                        [db.sequelize.col('group.name'),'name'],
                                    ]},
                raw:true}).then(groups => {
    res.json(groups);
  });
};