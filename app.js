var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

var mongoose = require('mongoose');
var config = require('./config.json');

var User = require('./models/users');

// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

var routes = require('./routes/index');
var users = require('./routes/users');
var dashboard = require('./routes/dashboard');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('income'));
app.use(session({
  secret: 'monthly-income',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, maxAge: 60000 }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/dashboard', dashboard);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  app.set('trust proxy', 1) // trust first proxy
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

mongoose.connect(config.mongoose.uri, function(err){
  if(err)
    console.error.bind(console, 'Connection error:')
});


module.exports = app;
