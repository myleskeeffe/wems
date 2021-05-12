const models = require('express').Router();

import { listCohorts } from './list';
import { readCohort } from './read';
import { updateCohort } from './update';

models.get('/', listCohorts);
models.get('/:id', readCohort)
models.put('/:id', updateCohort)

export const modelsCohort = models;