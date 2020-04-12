var express = require('express');
var router = express.Router();
var todoController = require('../controllers/todo.controller');
var todoValidation = require('../validation/todo.validation');

router.post('/add', todoValidation.add, todoController.add);

router.get('/delete/:id', todoController.deleteGet);

module.exports = router;