var express = require('express');
var app = express();

var port = 9999;

app.get('/', function(request, response){
	response.send('Hellu Thach Thao');
});

app.get('/corona', function(request, response){
	response.send('<h2>Corona Virus</h2>');
});

app.listen(port, function(){
	console.log('Server listening on port ' + port);
});