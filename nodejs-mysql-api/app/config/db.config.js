const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  // operatorsAliases: false,
  timezone: '+9:00',
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
//Models/tables
db.employees = require('../model/employee.js')(sequelize, Sequelize);
db.positions = require('../model/position.js')(sequelize, Sequelize);
db.units = require('../model/unit.js')(sequelize, Sequelize);
db.meeting_records = require('../model/meeting-record.js')(sequelize, Sequelize);
db.motivations = require('../model/motivation.js')(sequelize, Sequelize);
db.charms = require('../model/charm.js')(sequelize, Sequelize);
db.groups = require('../model/group.js')(sequelize, Sequelize);
db.directivities = require('../model/directivity.js')(sequelize, Sequelize);
db.reviewers = require('../model/reviewer.js')(sequelize, Sequelize);
db.transfer_records = require('../model/transfer-record.js')(sequelize, Sequelize);
db.prefectures = require('../model/prefecture.js')(sequelize, Sequelize);

db.employees.hasMany(db.meeting_records, {foreignKey: 'id', targetKey: 'employeeId'});
db.meeting_records.belongsTo(db.employees, {foreignKey: 'employeeId', targetKey: 'id'});
db.meeting_records.belongsTo(db.reviewers, {foreignKey: 'reviewerId', targetKey: 'id'});
 
db.employees.belongsTo(db.positions, {foreignKey: 'positionId', targetKey: 'id'});
db.positions.hasMany(db.employees, {foreignKey: 'id', targetKey: 'positionId'});

db.employees.belongsTo(db.units, {foreignKey: 'unitId', targetKey: 'id'});
db.units.hasMany(db.employees, {foreignKey: 'id', targetKey: 'unitId'});

db.employees.belongsTo(db.prefectures, {foreignKey: 'prefectureId', targetKey: 'id'});
db.prefectures.hasMany(db.employees, {foreignKey: 'id', targetKey: 'prefectureId'});

db.employees.belongsTo(db.motivations, {foreignKey: 'motivationId', targetKey: 'id'});
db.motivations.hasMany(db.employees, {foreignKey: 'id', targetKey: 'motivationId'});

db.employees.belongsTo(db.charms, {foreignKey: 'charmId', targetKey: 'id'});
db.charms.hasMany(db.employees, {foreignKey: 'id', targetKey: 'charmId'});

db.employees.belongsTo(db.directivities, {foreignKey: 'directivityId', targetKey: 'id'});
db.directivities.hasMany(db.employees, {foreignKey: 'id', targetKey: 'directivityId'});

db.employees.belongsTo(db.groups, {foreignKey: 'groupId', targetKey: 'id'});
db.groups.hasMany(db.employees, {foreignKey: 'id', targetKey: 'groupId'});

db.transfer_records.belongsTo(db.reviewers, {as: 'oldReviewer', foreignKey: 'oldReviewerId', targetKey: 'id'});
db.transfer_records.belongsTo(db.reviewers, {as: 'newReviewer', foreignKey: 'newReviewerId', targetKey: 'id'});
db.transfer_records.belongsTo(db.groups, {as: 'oldGroup', foreignKey: 'oldGroupId', targetKey: 'id'});
db.transfer_records.belongsTo(db.groups, {as: 'newGroup', foreignKey: 'newGroupId', targetKey: 'id'});
db.transfer_records.belongsTo(db.units, {as: 'oldUnit', foreignKey: 'oldUnitId', targetKey: 'id'});
db.transfer_records.belongsTo(db.units, {as: 'newUnit', foreignKey: 'newUnitId', targetKey: 'id'});

db.reviewers.belongsTo(db.groups, {foreignKey: 'groupId', targetKey: 'id'});
db.reviewers.belongsTo(db.units, {foreignKey: 'unitId', targetKey: 'id'});
db.reviewers.belongsTo(db.positions, {foreignKey: 'positionId', targetKey: 'id'});

module.exports = db;