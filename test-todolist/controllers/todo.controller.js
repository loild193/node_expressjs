var bodyParser = require('body-parser');
var shortid = require('shortid');

var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');

db = low(adapter);

db.defaults({ items: [] })
  .write();

module.exports.add = function(req, res){
  req.body.id = shortid.generate();
  db.get('items').push(req.body).write();
  res.redirect('/');
};

module.exports.deleteGet = function(req, res){
  var id = req.body.id;
  db.get('items').find({ id: id }).unset('name').write();

  res.redirect('/');
};
