var express = require('express');
var app = express();

var port = 9999;

app.set('view engine', 'pug');
app.set('views','./views');

var users = [
	{ id: 1, name: 'Loi'},
	{ id: 2, name: 'Le'}
];

app.get('/', function(req, res){
	res.render('index', {
		name: 'Thach Thao'
	});
});

app.get('/corona/search', function(req, res){
	var q = req.query.q;
	var matchedUser = users.filter(function(user){
		return user.name.indexOf(q) !== -1;
	});
	res.render('users/index', {
		users: matchedUser
	});
});

app.listen(port, function(){
	console.log('Server listening on port ' + port);
});