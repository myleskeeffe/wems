// Import & Setup Sequelize (our ORM)
const { Sequelize, DataTypes } = require('sequelize')

// Initialise DB Connection (could be substituted with PostgreSQL in production)
const sequelize = new Sequelize('sqlite:./database.sqlite3')

var userM = require('./User');
var dbUser = userM(sequelize, DataTypes);
dbUser.sync();

module.exports = {
  user: dbUser
}