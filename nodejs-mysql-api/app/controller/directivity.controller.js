const db = require('../config/db.config.js');
const Directivity = db.directivities;
 
exports.findAll = (req, res) => {
  Directivity.findAll({order: [['id', 'ASC']],
                attributes:{include:[
                                        [db.sequelize.col('directivity.name'),'name'],
                                    ]},
                raw:true}).then(directivities => {
    res.json(directivities);
  });
};