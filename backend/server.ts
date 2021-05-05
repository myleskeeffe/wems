// Import Express Framework & Init
var express = require('express');
var app = express();

// Settings for Express
app.use(express.json());

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