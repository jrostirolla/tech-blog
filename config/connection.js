const Sequelize = require('sequelize');
require('dotenv').config();
const withAuth = require('../utils/auth');

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'heroku',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;
