var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');

var adapter = new FileSync('db.json');
db = low(adapter);
db.defaults({ users: [] })
  .write();

var port = 9999;

app.set('view engine', 'pug');
app.set('views','./views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function(req, res){
	res.render('index', {
		name: 'Thach Thao'
	});
});

app.get('/users', function(req, res){
	res.render('users/index', {
		users: db.get('users').value()
	});
});

app.get('/users/search', function(req, res){
	var q = req.query.q;
	var matchedUser = db.get('users').value().filter(function(user){
		return user.name.indexOf(q) !== -1;
	});
	res.render('users/index', {
		users: matchedUser
	});
});

app.get('/users/create', function(req, res){
	res.render('users/create');
});

app.post('/users/create', function(req, res){
	db.get('users').push(req.body).write();
	res.redirect('/users');
});

app.listen(port, function(){
	console.log('Server listening on port ' + port);
});