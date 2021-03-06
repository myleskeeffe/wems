// Import Express Framework & Init
import express from 'express';
const app = express();

import cors from 'cors';

// Settings for Express
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())

var port = process.env.PORT || 8080;


// Setup Routes
var router = express.Router();

router.get('/', function (req:Request, res:any) {
  res.json({ message: 'Welcome to the WEMS API. Please read the docs for more info.' })
})

const user = require('./routes/user/index');
router.use('/user', user);

import { modelsCohort } from './routes/cohort/index';
router.use('/cohorts', modelsCohort)

import { modelsGroup } from './routes/groups/index';
router.use('/group', modelsGroup)

import { modelsPlacement } from './routes/workplacements/index';
router.use('/placement', modelsPlacement);

import { modelsAddress } from './routes/address/index';
router.use('/address', modelsAddress); 

import { modelsCompany } from './routes/company/index';
router.use('/company', modelsCompany);

import { modelsContact } from './routes/contact/index';
router.use('/contact', modelsContact);

import { modelsVisitation } from './routes/visitation/index';
router.use('/visitation', modelsVisitation);

app.use('/api', router);


// Start Listening
app.listen(port);
console.log('Successfully started on port: ' + port)