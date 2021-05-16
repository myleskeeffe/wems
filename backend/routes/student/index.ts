const models = require('express').Router();

import { listStudents } from './list';
import { createStudent } from './create';
// let User = require("./models/User")(sequelize, DataTypes).User;

models.get('/', listStudents);
models.post('/', createStudent);
// models.get('/:id', uInfo)
// models.put('/:id', uModify)
// models.delete('/:id', deleteUser)

export const modelsStudent= models;