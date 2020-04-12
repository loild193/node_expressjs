var express = require('express');

var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');

db = low(adapter);

db.defaults({ items: [] })
  .write();

var todoRoutes = require('./routes/todo.route');

var port = 9998;

var app = express();
app.set('view engine', 'pug');
app.set('views','./views');
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function(req, res){
  res.render('index', {
    items: db.get('items').value()
  });
});

app.use('/', todoRoutes);

app.listen(port, function(){
  console.log('Server listening on port ' + port);
});