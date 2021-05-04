const models = require('express').Router();
const list = require('./list');

models.get('/', list);

module.exports = models;