const models = require('express').Router();
const list = require('./list');

// let User = require("./models/User")(sequelize, DataTypes).User;

models.get('/', list);

module.exports = models;