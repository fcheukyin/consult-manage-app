const db = require('../config/db.config.js');
const Charm = db.charms;
 
exports.findAll = (req, res) => {
  Charm.findAll({order: [['id', 'ASC']],
                attributes:{include:[
                                        [db.sequelize.col('charm.name'),'name'],
                                    ]},
                raw:true}).then(charms => {
    res.json(charms);
  });
};