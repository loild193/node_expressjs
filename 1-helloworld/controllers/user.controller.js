var shortid = require('shortid');
var db = require('../db');

module.exports.index = function(req, res){
	res.render('users/index', {
		users: db.get('users').value()
	});
};

module.exports.search = function(req, res){
	var q = req.query.q;
	var matchedUser = db.get('users').value().filter(function(user){
		return user.name.indexOf(q) !== -1;
	});
	res.render('users/index', {
		users: matchedUser
	});
};

module.exports.getCreate = function(req, res){
	res.render('users/create');
};

module.exports.postCreate = function(req, res){
	var errors = [];
	req.body.id = shortid.generate();
	db.get('users').push(req.body).write();
	res.redirect('/users');
};

module.exports.getInfo = function(req, res){
	var id = req.params.id;
	var user = db.get('users').find({ id: id }).value();

	res.render('users/view', {
		user: user
	});
};