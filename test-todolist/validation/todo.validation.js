var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');

db = low(adapter);

db.defaults({ items: [] })
  .write();

module.exports.add = function(req, res, next){
	var errors = [];

	if (!req.body.name) {
		errors.push('Todo is required!');
	}
	if(errors.length) {
		res.render('index', {
			items: db.get('items').value(),
		    errors: errors
		});
		return;
	}
	next();
}