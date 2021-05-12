const models = require('express').Router();

import { listCohorts } from './list';
import { readCohort } from './read';
import { updateCohort } from './update';
import { createCohort } from './create';

models.get('/', listCohorts);
models.get('/:id', readCohort)
models.put('/:id', updateCohort)
models.post('/', createCohort)

export const modelsCohort = models;