var Transfer = require('../models/transfer.model');
var shortid = require('shortid');
var db = require('../db');

module.exports.create = function(req, res, next) {
  res.render('transfer/create', {
    csrfToken: req.csrfToken()
  });
}

module.exports.postCreate = function(req, res, next) {
  var data = new Transfer({
    amount: parseInt(req.body.amount),
    accountId: req.body.accountId,
    userId: req.signedCookies.userId
  });

  data.save();
  // db.get('transfer').push(data).write();
  res.redirect('/transfer/create');
}