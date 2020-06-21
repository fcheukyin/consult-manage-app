const db = require('../config/db.config.js');
const Motivation = db.motivations;
 
exports.findAll = (req, res) => {
  Motivation.findAll({order: [['id', 'ASC']],
                attributes:{include:[
                                        [db.sequelize.col('motivation.name'),'name'],
                                    ]},
                raw:true}).then(motivations => {
    res.json(motivations);
  });
};