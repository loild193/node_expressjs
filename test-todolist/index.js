var express = require('express');
var bodyParser = require('body-parser');
var shortid = require('shortid');

var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');

db = low(adapter);

db.defaults({ items: [] })
  .write();

// var Routes = require('./routes/user.route');

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

app.post('/add', function(req, res){
  req.body.id = shortid.generate();
  db.get('items').push(req.body).write();
  res.redirect('/');
});

app.get('/delete/:id', function(req, res){
  var id = req.body.id;
  db.get('items').find({ id: id }).unset('name').write();

  res.redirect('/');
});

app.listen(port, function(){
  console.log('Server listening on port ' + port);
});