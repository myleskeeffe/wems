const models = require('express').Router();

import { listPlacements } from './list';
// import { readPlacement } from './read';
// import { updatePlacement } from './update';
import { createPlacement } from './create';
// import { deletePlacement } from './delete';

models.get('/', listPlacements);
// models.get('/:id', readPlacement)
// models.put('/:id', updatePlacement)
models.post('/', createPlacement)
// models.delete('/:id', deletePlacement)

export const modelsPlacement = models;