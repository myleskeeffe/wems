// Import Express Framework & Init
var express = require('express');
var app = express();

// Import & Setup Sequelize (our ORM)
const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize('sqlite:./database.sqlite3')

async function dbAuth() {
  try {
    await sequelize.authenticate();
    console.log('DB Connected Successfully.');
  } catch (error) {
    console.error("Could not connect to database: ", error)
  }
}

dbAuth();

// Import DB Models
let User = require("./models/User")(sequelize, DataTypes).User;

// Settings for Express
app.use(express.json());

var port = process.env.PORT || 8080;


// Setup Routes
var router = express.Router();

router.get('/', function (req, res) {
  res.json({ message: 'Welcome to the WEMS API. Please read the docs for more info.' })
})

const user = require('./routes/user/index');
router.use('/user', user);

app.use('/', router);


// Start Listening
app.listen(port);
console.log('Successfully started on port: ' + port)