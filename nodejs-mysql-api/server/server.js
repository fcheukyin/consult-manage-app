var http = require("http");
var express = require('express');
var app = express();
var mysql      = require('mysql');
var bodyParser = require('body-parser');
var path = require('path');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
} 
app.use(cors(corsOptions))

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'test_app'
});

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})

var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});

//EJS view render engine setup
app.set('views', __dirname + '/view');
app.engine('html', require('ejs').renderFile);

app.get('/api/get', function (req, res) {
   connection.query('select * from test_data', function (error, results, fields) {
	  if (error) throw error;
    //res.render('index.html',{results});
    console.log('Request come!')
    res.send('test')
	});
});

app.get('/api/get/:id', function (req, res) {
 connection.query('select * from test_data where id=?', [req.params.id], function (error, results, fields) {
  if (error) throw error;
  console.log(results);
  res.json(results);
	});
});

app.post('/add', function (req, res) {
   var postData  = req.body;
   console.log(req.body);
   var query = connection.query('INSERT INTO test_data SET ?', postData, function (error, results, fields) {
	  if (error) throw error;
    res.set('Content-Type', 'text/plain; charset=utf-8');
	  res.end(JSON.stringify(results));
	});
});

app.put('/update', function (req, res) {
  connection.query('UPDATE test_data SET name = ? where id = ?', [req.body.name, req.body.id], function (error, results, fields) {
    if (error) throw error;
    res.set('Content-Type', 'text/plain; charset=utf-8');
	  res.end(JSON.stringify(results));
  });
});

app.delete('/delete', function (req, res) {
  connection.query('DELETE FROM test_data where id = ?', [req.body.id], function (error, results, fields) {
    if (error) throw error;
	  res.location('http://www.apple.com');
  });
});

app.get('/home', function (req, res){
  res.render('index.html');
})
