const models = require('express').Router();
const list = require('./list');
const uCreate = require('./uCreate')

// let User = require("./models/User")(sequelize, DataTypes).User;

models.get('/', list);
models.post('/create', uCreate);

module.exports = models;