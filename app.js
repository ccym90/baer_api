var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session')
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');

// Init express
var app = express();

//connect with Mongodb
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/27017/');

// view engine setup - needs a function 
app.set('views', path.join(__dirname, 'views')); //dir name current directory root of project, absolute path of proj dir + views
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); //logger sensitivity set to development 
app.use(bodyParser.json()); //can pass through body if is json file 
app.use(bodyParser.urlencoded({ extended: false }));//used with form to interpret content
app.use(cookieParser());//allows to read cookies
app.use(express.static(path.join(__dirname, 'public'))); //trys to see if there is a route in public folder to match the file


// Setup sessions
app.use(session({ secret: 'ilovecake',
					resave: false,
					saveUninitialized: false
				}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// import routes initalises middleware to begin to use the routes
var index = require('./routes/index');
var users = require('./routes/users')(app, passport);
var coor = require('./routes/location');

// Setup local strategy
require('./passport/local')(passport);
require('./passport/facebook')(passport);
require('./passport/instagram')(passport);
require('./passport/google')(passport);

//import routes
app.use('/', index); //gets the root of index
app.use('/location', coor); //gets the root of /location 

// catch 404 and forward to error handler
app.use(function(req, res, next) {

  var err = new Error('Not Found');
  err.status = 404;
  next(err);

});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page - internal server errors
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;