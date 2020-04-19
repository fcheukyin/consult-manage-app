const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
 
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

db.employees.hasMany(db.meeting_records, {foreignKey: 'id', targetKey: 'employeeId'});
db.meeting_records.belongsTo(db.employees, {foreignKey: 'employeeId', targetKey: 'id'});
 
db.employees.belongsTo(db.positions, {foreignKey: 'positionId', targetKey: 'id'});
db.positions.hasMany(db.employees, {foreignKey: 'id', targetKey: 'positionId'});

db.employees.belongsTo(db.units, {foreignKey: 'unitId', targetKey: 'id'});
db.units.hasMany(db.employees, {foreignKey: 'id', targetKey: 'unitId'});

db.employees.belongsTo(db.motivations, {foreignKey: 'motivationId', targetKey: 'id'});
db.motivations.hasMany(db.employees, {foreignKey: 'id', targetKey: 'motivationId'});

db.employees.belongsTo(db.charms, {foreignKey: 'charmId', targetKey: 'id'});
db.charms.hasMany(db.employees, {foreignKey: 'id', targetKey: 'charmId'});

db.employees.belongsTo(db.directivities, {foreignKey: 'directivityId', targetKey: 'id'});
db.directivities.hasMany(db.employees, {foreignKey: 'id', targetKey: 'directivityId'});

db.employees.belongsTo(db.groups, {foreignKey: 'groupId', targetKey: 'id'});
db.groups.hasMany(db.employees, {foreignKey: 'id', targetKey: 'groupId'});

module.exports = db;