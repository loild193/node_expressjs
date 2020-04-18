require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var csurf = require('csurf');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

var userRoutes = require('./routes/user.route');
var authRoutes = require('./routes/auth.route');
var productRoutes = require('./routes/product.route');
var cartRoutes = require('./routes/cart.route');
var transferRoutes = require('./routes/transfer.route');

var apiProductRoutes = require('./api/routes/product.route');

var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');

var port = 9999;

var app = express();
app.set('view engine', 'pug');
app.set('views','./views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/api/products', apiProductRoutes);

app.use(express.static('public'));
app.use(cookieParser(process.env.SESSION_SECRET));
// app.use(csurf({ cookie: true }));

app.use(sessionMiddleware);

app.get('/', function(req, res){
	res.render('index', {
		name: 'Thach Thao'
	});
});

app.use('/users', authMiddleware.requireAuth, userRoutes);
app.use('/auth', authRoutes);
app.use('/product', productRoutes);
app.use('/cart', cartRoutes);
app.use('/transfer', authMiddleware.requireAuth, transferRoutes);

app.listen(port, function(){
	console.log('Server listening on port ' + port);
});