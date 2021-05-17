const models = require('express').Router();

import { listContact } from './list';
import { updateContact } from './update';
import { createContact } from './create';

models.get('/', listContact);
models.put('/:id', updateContact)
models.post('/', createContact)

export const modelsContact = models;