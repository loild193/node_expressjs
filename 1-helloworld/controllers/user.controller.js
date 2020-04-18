var shortid = require('shortid');
var User = require('../models/user.model');

module.exports.index = async function(req, res){
	var users = await User.find();

	res.render('users/index', {
		users: users
	});
};

module.exports.search = async function(req, res){
	var q = req.query.q;
	var users = await User.find();

	var matchedUser = users.filter(function(user){
		return user.name.indexOf(q) !== -1;
	});
	res.render('users/index', {
		users: matchedUser
	});
};

module.exports.getCreate = function(req, res){
	res.render('users/create', {
    csrfToken: req.csrfToken()
  });
};

module.exports.postCreate = async function(req, res){
	req.body.avatar = req.file.path.split('/').slice(1).join('/');
	
	req.body = await User.save();

	// db.get('users').push(req.body).write();
	res.redirect('/users');
};

module.exports.getInfo = async function(req, res){
	var id = req.params.id;
	var user = await User.find().where({ id: req.params.id });
	
	// var user = users.where({ id: id });

	res.render('users/view', {
		user: user
	});
};