var mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema({
  
});

var Session = mongoose.model('Session', productSchema, 'sessions');

module.exports = Session;

