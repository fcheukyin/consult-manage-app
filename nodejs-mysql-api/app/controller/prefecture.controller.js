const db = require('../config/db.config.js');
const Prefecture = db.prefectures;
 
exports.findAll = (req, res) => {
  Prefecture.findAll({order: [['id', 'ASC']],
                attributes:{include:[
                                        [db.sequelize.col('prefecture.name'),'name'],
                                    ]},
                raw:true}).then(prefectures => {
    res.json(prefectures);
  });
};