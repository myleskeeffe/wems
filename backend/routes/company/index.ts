const models = require('express').Router();

import { listCompany } from './list';
import { updateCompany } from './update';
import { createCompany } from './create';

models.get('/', listCompany);
models.put('/:id', updateCompany)
models.post('/', createCompany)

export const modelsCompany = models;