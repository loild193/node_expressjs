var express = require('express');
var multer  = require('multer');

var router = express.Router();

var controller = require('../controllers/user.controller');
var validation = require('../validation/user.validation');

var upload = multer({ dest: 'public/uploads/' })

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.getCreate);

router.post('/create', 
    upload.single('avatar'), 
    validation.postCreate, 
    controller.postCreate
);

router.get('/:id', controller.getInfo);

module.exports = router;