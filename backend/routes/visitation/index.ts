const models = require('express').Router();

import { listVisitation } from './list';
import { updateVisitation } from './update';
import { createVisitation } from './create';
import { deleteVisitation } from './delete';

models.get('/', listVisitation);
models.put('/:id', updateVisitation);
models.post('/', createVisitation);
models.delete('/:id', deleteVisitation);

export const modelsContact = models;