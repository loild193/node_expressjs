var db = require('../db');

module.exports.addToCart = function(req, res, next) {
  var productId = req.params.productId;
  var sessionId = req.signedCookies.sessionId;

  if (!sessionId) {
    res.redirect('/product');
    return;
  }

  var count = db.get('session')
                .find({ id: sessionId })
                .get('cart.' + productId, 0)
                .value();

  db.get('session')
    .find({ id: sessionId })
    .set('cart.' + productId, ++count)
    .write();

  res.redirect('/product');  
}