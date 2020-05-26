const db = require('../config/db.config.js');
const Unit = db.units;
 
exports.findAll = (req, res) => {
  Unit.findAll({order: [['id', 'ASC']],
                attributes:{include:[
                                        [db.sequelize.col('unit.name'),'name'],
                                    ]},
                raw:true}).then(units => {
    res.json(units);
  });
};