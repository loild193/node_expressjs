var express = require('express');
var bodyParser = require('body-parser');

var userRoutes = require('./routes/user.route');

var port = 9999;

var app = express();
app.set('view engine', 'pug');
app.set('views','./views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'));

app.get('/', function(req, res){
	res.render('index', {
		name: 'Thach Thao'
	});
});

app.use('/users', userRoutes);

app.listen(port, function(){
	console.log('Server listening on port ' + port);
});