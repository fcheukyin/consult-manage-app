process.env.TZ = 'Asia/Tokyo'
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
app.use(bodyParser.json())
 
const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}
 
app.use(cors(corsOptions))
 
const db = require('./app/config/db.config.js');

require('./app/route/auth.route.js')(app);
 
require('./app/route/employee.route.js')(app);
require('./app/route/meeting-record.route.js')(app);
require('./app/route/group.route.js')(app);
require('./app/route/attachment.route.js')(app);
require('./app/route/transfer-record.route.js')(app);
require('./app/route/reviewer.route')(app);
require('./app/route/position.route')(app);
require('./app/route/motivation.route')(app);
require('./app/route/prefecture.route')(app);
require('./app/route/charm.route')(app);
require('./app/route/directivity.route')(app);
 
// Create a Server
var server = app.listen(8080, function () {
 
  let host = server.address().address
  let port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port);
})