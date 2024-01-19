const express = require("express");
const cors = require("cors");
const path = require('path')
var bodyParser = require('body-parser')
const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;

// db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync({ force: false }).then(() => {
  console.log('Drop and Resync Database with { force: true }');
});
// Serve static files from the 'build' directory
app.use('/', express.static(path.join(__dirname, '/')));

app.use(express.static(path.join(__dirname, 'build')));
// Handle other routes by serving 'index.html'
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './build/', 'index.html'));
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/upload.routes')(app);
require('./app/routes/recipe.routes')(app);
require('./app/routes/comment.routes.js')(app);
//require('./app/routes/recommended.routes')(app);
//require('./app/routes/search.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
