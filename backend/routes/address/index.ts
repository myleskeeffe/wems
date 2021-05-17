const models = require('express').Router();

import { listCountry } from './country/list';
import { listState } from './state/list';
import { listPostcode } from './postcode/list';
import { listSuburb } from './suburb/list'
import { listAddress } from './list';

import { createCountry } from './country/create';
import { createState } from './state/create';
import { createPostcode } from './postcode/create';
import { createSuburb } from './suburb/create'
import { createAddress } from './create';

models.get('/country', listCountry);
models.get('/state', listState);
models.get('/postcode', listPostcode);
models.get('/suburb', listSuburb);
models.get('/', listAddress)
models.post('/country', createCountry);
models.post('/state', createState);
models.post('/postcode', createPostcode);
models.post('/suburb', createSuburb);
models.post('/', createAddress)

export const modelsAddress = models;