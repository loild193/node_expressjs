require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var userRoutes = require('./routes/user.route');
var authRoutes = require('./routes/auth.route');
var productRoutes = require('./routes/product.route');
var cartRoutes = require('./routes/cart.route');

var authMiddleware = require('./middlewares/auth.middleware');

var port = 9999;

var app = express();
app.set('view engine', 'pug');
app.set('views','./views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'));
app.use(cookieParser('sdgafhklsdjhfalksjhfl'));

app.get('/', function(req, res){
	res.render('index', {
		name: 'Thach Thao'
	});
});

app.use('/users', authMiddleware.requireAuth, userRoutes);
app.use('/auth', authRoutes);
app.use('/product', productRoutes);
app.use('/cart', cartRoutes);

app.listen(port, function(){
	console.log('Server listening on port ' + port);
});