const models = require('express').Router();
const uList = require('./uList');
const uCreate = require('./uCreate')
const uInfo = require('./uInfo');

import { findUser } from '../../utils/auth/findUser'
import { createUser } from '../../utils/auth/createUser';
import { listUsers } from '../../utils/auth/listUsers';
import { deleteUser } from './deleteUser';

import {updateUser} from './update';

// let User = require("./models/User")(sequelize, DataTypes).User;

models.get('/', uList);
models.post('/', uCreate);
models.get('/:id', uInfo)
models.put('/:id', updateUser)
models.delete('/:id', deleteUser)

module.exports = models;