const db = require('../config/db.config.js');
const Position = db.positions;
 
exports.findAll = (req, res) => {
  Position.findAll({order: [['id', 'ASC']],
                attributes:{include:[
                                        [db.sequelize.col('position.name'),'name'],
                                    ]},
                raw:true}).then(position => {
    res.json(position);
  });
};