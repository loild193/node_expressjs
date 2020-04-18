var Product = require('../models/product.model');

module.exports.index = async function(req, res){
	// var page = parseInt(req.query.q) || 1; // n
	// var perPage = 8; // x
	
	// var start = (page - 1) * perPage;
	// var end = page * perPage;

	// res.render('products/product', {
	// 	products: db.get('products').value().slice(start, end)
	// });

  var products = await Product.find();
  res.render('products/product', {
    products: products
  });
};