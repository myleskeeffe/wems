const models = require('express').Router();

import { listGroups } from './list';
import { readGroup } from './read';
import { updateGroup } from './update';
import { createGroup } from './create';

models.get('/', listGroups);
models.get('/:id', readGroup)
models.put('/:id', updateGroup)
models.post('/', createGroup)

export const modelsGroup = models;