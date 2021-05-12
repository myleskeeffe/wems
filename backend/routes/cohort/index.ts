const models = require('express').Router();

import { listCohorts } from './list';

models.get('/', listCohorts);

export const modelsCohort = models;