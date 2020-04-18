var express = require('express');

var router = express.Router();

var controller = require('../controllers/product.controller');

router.get('/', controller.index);
router.post('/', controller.create);
router.put('/:id', controller.put);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.delete);

module.exports = router;