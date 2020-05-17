const env = {
    database: 'test_app',
    username: 'root',
    password: 'root',
    host: 'localhost',
    timezone: 'utc',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
   
  module.exports = env;
  