// Import Express Framework & Init
import express from 'express';
const app = express();

// Settings for Express
app.use(express.json());
app.use(express.urlencoded({extended: true}));

var port = process.env.PORT || 8080;


// Setup Routes
var router = express.Router();

router.get('/', function (req:Request, res:any) {
  res.json({ message: 'Welcome to the WEMS API. Please read the docs for more info.' })
})

const user = require('./routes/user/index');
router.use('/user', user);

app.use('/api', router);


// Start Listening
app.listen(port);
console.log('Successfully started on port: ' + port)