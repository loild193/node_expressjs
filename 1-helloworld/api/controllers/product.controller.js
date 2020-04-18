var Product = require('../../models/product.model');

module.exports.index = async function(req, res){
  var products = await Product.find();
  res.json(products);
};

module.exports.create = async function(req, res) {
  var product = await Product.create(req.body);
  res.json(product);
}

module.exports.put = function(req, res) {

  Product.findById(req.params.id, function(err, doc) {
    if (!doc) {
      doc = Product.create(req.body);

      res.json(doc);
    }
    else {
      doc.name = req.body.name;
      doc.image = req.body.image;
      doc.description = req.body.description;
      
      doc.save();
      
      res.json(doc);
    }
  });
}

module.exports.patch = function(req, res) {
  Product.findById(req.params.id ,function(err, doc) {
    if (doc) {
      doc.name = req.body.name;
      doc.image = req.body.image;
      doc.description = req.body.description;
      doc.save();

      res.json(doc);  
    }
  });
}

module.exports.delete = async function(req, res) {
  var deletedProduct = await Product.deleteOne({ _id: req.params.id });
}