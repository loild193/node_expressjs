var mongoose = require('mongoose');

var transferSchema = new mongoose.Schema({
  accountId: String,
  amount: Number,
  userId: String
});

var Transfer = mongoose.model('Transfer', transferSchema, 'transfers');

module.exports = Transfer;

